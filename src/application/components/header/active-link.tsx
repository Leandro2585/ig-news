import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, cloneElement } from 'react'
import styles from './styles.module.scss'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
}

export const ActiveLink = ({ children, ...rest }: ActiveLinkProps) => {
  const { asPath } = useRouter()
  const className =  `${rest.href}`.split('/')[1] === asPath.split('/')[1] ? styles.active : ''
  return (
    <Link {...rest}>
      {cloneElement(children, { className })}
    </Link>
  )
}