import { signIn, useSession, signOut } from 'next-auth/react'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'

export const SignButton = () => {
  const { status, data } = useSession() 
  return status === 'authenticated' ? (
    <button type='button' className={styles.sign_button}>
      <FaGithub color='#04D361' />
      {data.user.name}
      <FiX color='#737380' className={styles.close_icon} onClick={() => signOut()}/>
    </button>
  ) : (
    <button type='button' className={styles.sign_button} onClick={() => signIn('github')}>
      <FaGithub color='#EBA417'/>
      Sign in with GitHub
    </button>
  )
}