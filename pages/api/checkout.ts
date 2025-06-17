import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
apiVersion: '2024-04-10' as Stripe.LatestApiVersion,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: { name: 'Abonament Generator Blog' },
        unit_amount: 500,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${req.headers.origin}/?success=true`,
    cancel_url: `${req.headers.origin}/?canceled=true`,
  });

  res.status(200).json({ url: session.url });
}
