import { SignButton } from '../sign-button'
import styles from './styles.module.scss'

export const Header = () => {
  return (
    <header className={styles.header_container}>
      <div className={styles.header_content}>
        <img src='/svgs/logo.svg' alt='Ig News' />
        <nav>
          <a className={styles.active}>Home</a>
          <a href="">Posts</a>
        </nav>
        <SignButton/>
      </div>
    </header>
  )
}