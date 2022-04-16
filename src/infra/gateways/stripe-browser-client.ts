import { loadStripe } from '@stripe/stripe-js'

export const getStripeBrowserClient = async () => {
  const stripeJS = await loadStripe()
}