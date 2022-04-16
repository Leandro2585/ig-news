import styles from './styles.module.scss'

type ButtonProps = {
  priceId: string
}

export const SubscribeButton = ({ priceId }: ButtonProps) => {
  return (
    <button className={styles.subscribe_button} type='button'>
      Subscibe now
    </button>
  )
}