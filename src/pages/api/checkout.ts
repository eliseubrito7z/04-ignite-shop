import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { itemsId } = req.body
  const cartItems = itemsId.map((priceId: string) => {
    return {
      price: priceId,
      quantity: 1,
    }
  })

  console.log('cartItems', cartItems)
  console.log('itemsId', itemsId)

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  if (!itemsId) {
    return res.status(400).json({ error: 'Price not found.' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: cancelUrl,
    success_url: successUrl,
    mode: 'payment',
    line_items: cartItems,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
