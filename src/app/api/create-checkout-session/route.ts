import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: Request) {
  const { items } = await req.json()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    line_items: items.map((item: any) => ({
      price_data: {
        currency: 'sgd',
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get('origin')}/product/${items[0].id}`,
  })

  return NextResponse.json({ id: session.id })
}