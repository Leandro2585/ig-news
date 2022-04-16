import { GetStaticProps } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import { SubscribeButton } from '../application/components/subscribe-button';
import styles from '../application/styles/home.module.scss'
import { stripe } from '../infra/gateways';

type HomeProps = {
  product: {
    priceId: string
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
    <Head>
      <title>
        Home | Dev News
      </title>
    </Head>
    <main className={styles.content_container}>
      <section className={styles.hero}>
        <span>👋 Hey, welcome</span>
        <h1>News about <br/>the <span>React</span> world</h1>
        <p>
          Get access to all the publications <br/>
          <span>for {product.amount} month</span>
        </p>
        <SubscribeButton priceId={product.priceId}/>
      </section>
      <img src='/svgs/girl-coding.svg' alt='Girl Coding'/>
    </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const subscribePrice = await stripe.prices.retrieve('price_1KouW2BWcgumYhyW8dZtBsgd', {
    expand: ['product']
  })

  const product = {
    priceId: subscribePrice.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(subscribePrice.unit_amount / 100)
  }

  return {
    props: { 
      product
    },
    revalidate: 60 * 60 * 24
  }
}