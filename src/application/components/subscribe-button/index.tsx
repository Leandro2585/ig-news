import { signIn, useSession } from 'next-auth/react'
import { api } from '../../../infra/gateways/api'
import styles from './styles.module.scss'

type ButtonProps = {
  priceId: string
}

export const SubscribeButton = ({ priceId }: ButtonProps) => {
  const { status } = useSession()

  const handleSubscribe = async () => {
    if(status === 'unauthenticated') {
      signIn('github')
      return
    }
    try {
      const { data: { sessionId } } = await api.post('/subscribe')
      console.log(sessionId)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <button className={styles.subscribe_button} type='button' onClick={handleSubscribe}>
      Subscibe now
    </button>
  )
}