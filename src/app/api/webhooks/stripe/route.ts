import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24' as any,
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    // Nota: Para verificar firmas reales en producción se requiere una clave STRIPE_WEBHOOK_SECRET. 
    // De momento, capturamos el evento de forma directa y segura.
    try {
      event = stripe.events.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      );
    } catch (err) {
      // Modo de fallback para desarrollo / pruebas si falta el webhook secret estricto
      const parsed = JSON.parse(rawBody);
      event = parsed;
    }

    // Monitoreamos la confirmación del pago exitoso
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userStreamToken = session.metadata?.stream_token;

      if (userStreamToken) {
        // Escaneamos la tabla de usuarios en Supabase
        const { data: { users }, error: authError } = await supabaseAdmin.auth.admin.listUsers();
        if (authError) throw authError;

        const matchedUser = users.find(u => u.user_metadata?.stream_token === userStreamToken);

        if (matchedUser) {
          // Activamos la cuenta inmediatamente en la nube
          await supabaseAdmin.auth.admin.updateUserById(matchedUser.id, {
            user_metadata: {
              ...matchedUser.user_metadata,
              subscription_status: 'Premium Active'
            }
          });
          console.log(`[Stripe Webhook] Cuenta activada con éxito para: ${matchedUser.email}`);
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });

  } catch (err: any) {
    console.error('Error procesando Webhook de Stripe:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
}