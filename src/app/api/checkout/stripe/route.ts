import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24' as any, // Forzamos la API de Stripe estable
});

export async function POST(request: Request) {
  try {
    const { email, streamToken } = await request.json();

    if (!email || !streamToken) {
      return NextResponse.json({ error: 'Faltan parámetros de sesión.' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || 'https://auratv.vercel.app';

    // Creamos la sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'AuraTV Premium - Acceso Global de Transmisión',
              description: 'Suscripción mensual con activación inmediata de playlist IPTV.',
            },
            unit_amount: 999, // $9.99 USD expresado en centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      // Inyectamos el stream token en los metadatos para recuperarlo en el webhook
      metadata: {
        stream_token: streamToken,
      },
      success_url: `${origin}/dashboard?status=success`,
      cancel_url: `${origin}/register?status=canceled`,
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error('Error creando sesión Stripe:', error);
    return NextResponse.json({ error: 'Fallo interno en Stripe Checkout.' }, { status: 500 });
  }
}