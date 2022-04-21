import Link from 'next/link'
import { useRouter } from 'next/router'
import { SignButton } from '../sign-button'
import { ActiveLink } from './active-link'
import styles from './styles.module.scss'

export const Header = () => {
  return (
    <header className={styles.header_container}>
      <div className={styles.header_content}>
        <img src='/svgs/logo.svg' alt='Ig News' />
        <nav>
          <ActiveLink href='/'>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href='/posts'>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignButton/>
      </div>
    </header>
  )
}