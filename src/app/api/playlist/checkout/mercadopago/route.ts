import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Inicializamos el cliente con tu token secreto
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! 
});

export async function POST(request: Request) {
  try {
    const { email, streamToken, currency } = await request.json();

    if (!email || !streamToken) {
      return NextResponse.json({ error: 'Faltan datos obligatorios.' }, { status: 400 });
    }

    const preference = new Preference(client);

    // Calculamos la URL base dinámica para los retornos
    const origin = request.headers.get('origin') || 'https://auratv.vercel.app';

    const response = await preference.create({
      body: {
        items: [
          {
            id: 'auratv-premium',
            title: 'AuraTV Premium - Activación Línea Global',
            quantity: 1,
            unit_price: currency === 'MXN' ? 175.00 : 9.99, // Ajuste dinámico de tarifa estimada según la moneda
            currency_id: currency === 'MXN' ? 'MXN' : 'USD',
          }
        ],
        payer: {
          email: email
        },
        // Mapeamos el token único como referencia externa para que viaje con el pago
        external_reference: streamToken, 
        back_urls: {
          success: `${origin}/dashboard?status=success`,
          failure: `${origin}/register?status=failed`,
          pending: `${origin}/dashboard?status=pending`,
        },
        auto_return: 'approved',
        // Desactivamos métodos que no nos interesen si quisiéramos (opcional)
        notification_url: `${origin}/api/webhooks/mercadopago`, // El cerebro que recibirá el aviso de pago
      }
    });

    // Retornamos el link de pago (init_point) hacia el frontend
    return NextResponse.json({ id: response.id, init_point: response.init_point });

  } catch (error: any) {
    console.error('Error creando preferencia MP:', error);
    return NextResponse.json({ error: 'Error interno del servidor de pagos.' }, { status: 500 });
  }
}