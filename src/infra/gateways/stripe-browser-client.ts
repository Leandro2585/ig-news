import { loadStripe } from '@stripe/stripe-js'

export const getStripeBrowserClient = async () => {
  const stripeJS = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  return stripeJS
}