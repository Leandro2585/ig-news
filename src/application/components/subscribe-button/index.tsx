import { signIn, useSession } from 'next-auth/react'
import { api, getStripeBrowserClient } from '../../../infra/gateways'
import styles from './styles.module.scss'

export const SubscribeButton = () => {
  const { status } = useSession()

  const handleSubscribe = async () => {
    if(status === 'unauthenticated') {
      signIn('github')
      return
    }
    try {
      const { data: { sessionId } } = await api.post('/subscribe')
      const stripeBrowserClient = await getStripeBrowserClient()
      await stripeBrowserClient.redirectToCheckout({ sessionId })
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <button className={styles.subscribe_button} type='button' onClick={handleSubscribe}>
      Subscribe now
    </button>
  )
}