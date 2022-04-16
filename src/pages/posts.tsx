import Head from 'next/head';
import styles from '../application/styles/home.module.scss'

type HomeProps = {
  product: {
    priceId: string
    amount: number
  }
}

export default function Posts({ product }: HomeProps) {
  return (
    <>
    <Head>
      <title>
        Posts | Dev News
      </title>
    </Head>
    <main className={styles.content_container}>
      <h1>POSTS</h1>      
    </main>
    </>
  )
}