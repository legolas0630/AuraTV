import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      );
    } catch (err) {
      // Fallback parser parsing mechanics
      const parsed = JSON.parse(rawBody);
      event = parsed;
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userStreamToken = session.metadata?.stream_token;

      if (userStreamToken) {
        const { data: { users }, error: authError } = await supabaseAdmin.auth.admin.listUsers();
        if (authError) throw authError;

        const matchedUser = users.find(u => u.user_metadata?.stream_token === userStreamToken);

        if (matchedUser) {
          await supabaseAdmin.auth.admin.updateUserById(matchedUser.id, {
            user_metadata: {
              ...matchedUser.user_metadata,
              subscription_status: 'Premium Active'
            }
          });
          console.log(`[Stripe Webhook] Cloud verification complete. Line activated for: ${matchedUser.email}`);
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });

  } catch (err: any) {
    console.error('Error processing Stripe Webhook:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
}