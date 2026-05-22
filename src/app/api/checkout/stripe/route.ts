import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Omitting apiVersion entirely lets Stripe fall back to your live account's pinned '2026-04-22.dahlia' version automatically
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { email, priceType, streamToken } = await request.json();

    if (!email || !priceType || !streamToken) {
      return NextResponse.json({ error: 'Missing required validation fields.' }, { status: 400 });
    }

    // Stripe live mode enforces minimum charge parameters ($0.50 USD / $10.00 MXN)
    const isMonthly = priceType === 'monthly';
    const unitAmount = isMonthly ? 999 : 100; // $9.99 for monthly, $1.00 for live micro-swipe authorization verification
    const currencyCode = 'usd';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currencyCode,
            product_data: {
              name: isMonthly ? 'AuraTV Premium Monthly Suite' : 'AuraTV 24-Hour Ecosystem Test Voucher',
              description: isMonthly 
                ? 'Complete global Free-to-Air protocol network mapping access' 
                : 'Temporary 24h testing gateway verification line',
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/pricing`,
      metadata: {
        stream_token: streamToken,
      },
      customer_email: email,
    });

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error('Error creating Stripe Session:', err.message);
    return NextResponse.json({ error: `Error al inicializar Stripe Checkout: ${err.message}` }, { status: 500 });
  }
}