import { NextApiRequest, NextApiResponse } from 'next';
import { monitorEventLoopDelay } from 'perf_hooks';
import { Readable } from 'stream'
import Stripe from 'stripe';
import { stripe } from '../../infra/gateways';
import { saveSubscription } from './_lib/subscription-manager';

const buffer = async (readable: Readable): Promise<Buffer> => {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export const config = {
  api: {
    bodyParser: false
  }
}

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscriptions.created',
  'customer.subscriptions.updated',
  'customer.subscriptions.deleted'
])

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if(request.method === 'POST') {
    const buf = await buffer(request)
    const secret = request.headers['stripe-signature']
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
      return response.status(400).send(`Webhook error: ${err.message}`)
    }
    if(relevantEvents.has(event.type)) {
      try {
        switch(event.type) {
          case 'checkout.sesion.completed':
            const { subscription, customer } = event.data.object as Stripe.Checkout.Session
            await saveSubscription({ customerId: customer.toString(), subscriptionId: subscription.toString(), createAction: true })
            break
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            const subscriptionEvent = event.data.object as Stripe.Subscription
            await saveSubscription({ 
              subscriptionId: subscriptionEvent.id, 
              customerId: subscriptionEvent.customer.toString(),
              createAction: false
            })
            break
          default: 
            throw new Error('Unhandled event')
        }
      } catch (err) {
        return response.json({ error: 'Webhook handler failed' })
      }
      console.log('Event received: \n', event)
    }
    response.json({ received: true })
  } else {
    response.setHeader('Allow', 'POST')
    response.status(405).end('Method not allowed')
  }
}