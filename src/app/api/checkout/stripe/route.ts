import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { email, priceType, streamToken } = await request.json();

    if (!email || !priceType || !streamToken) {
      return NextResponse.json({ error: 'Missing required validation fields.' }, { status: 400 });
    }

    // Mapping cents amount directly to your customized $4.99 & $14.99 parameters
    const isPremium = priceType === 'premium';
    const unitAmount = isPremium ? 1499 : 499; 
    const currencyCode = 'usd';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currencyCode,
            product_data: {
              name: isPremium ? 'AuraTV Premium Ultra Suite' : 'AuraTV Basic Stream Membership',
              description: isPremium 
                ? 'Complete 15,000+ global directory, 4K loops, and Anti-Freeze 6.0 optimization.' 
                : 'Essential streaming array covering 5,000+ regional channels in crisp HD.',
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
        price_type: priceType, // Passes 'basic' or 'premium' cleanly to the webhook array
      },
      customer_email: email,
    });

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error('Error creating Stripe Session:', err.message);
    return NextResponse.json({ error: `Error al inicializar Stripe Checkout: ${err.message}` }, { status: 500 });
  }
}