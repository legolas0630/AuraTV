import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Cliente privilegiado de Supabase para guardar cambios del servidor
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mercado Pago envía alertas por múltiples acciones. Solo nos importan los pagos ("payment")
    if (body.action === 'payment.created' || body.type === 'payment') {
      const paymentId = body.data?.id || body.id;

      // Consultamos el estado real del pago directamente a la API de Mercado Pago para evitar hackeos
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
        }
      });

      if (!mpRes.ok) {
        return new Response('Error consultando pago en Mercado Pago', { status: 400 });
      }

      const paymentData = await mpRes.json();

      // Verificamos que el pago esté aprobado al 100%
      if (paymentData.status === 'approved') {
        const userStreamToken = paymentData.external_reference; // Recuperamos el token inyectado

        // 1. Escaneamos los usuarios de tu base de datos para ver a quién le pertenece este token
        const { data: { users }, error: authError } = await supabaseAdmin.auth.admin.listUsers();
        
        if (authError) throw authError;

        const matchedUser = users.find(u => u.user_metadata?.stream_token === userStreamToken);

        if (matchedUser) {
          // 2. ¡BOOM! Encontramos al usuario. Actualizamos sus metadatos a Premium Activo de por vida en la nube
          await supabaseAdmin.auth.admin.updateUserById(matchedUser.id, {
            user_metadata: {
              ...matchedUser.user_metadata,
              subscription_status: 'Premium Active' // El dashboard ahora brillará con este nuevo estado
            }
          });

          console.log(`[AuraTV Webhook] Línea activada con éxito para: ${matchedUser.email}`);
        }
      }
    }

    // Mercado Pago exige recibir un código HTTP 200 o 201 para saber que recibiste la notificación correctamente
    return new Response('OK', { status: 200 });

  } catch (err) {
    console.error('Crash en Webhook de Mercado Pago:', err);
    return new Response('Internal Webhook Error', { status: 500 });
  }
}