import Head from 'next/head'
import { RichText } from 'prismic-dom'
import { GetServerSideProps } from 'next'
import { getPrismicClient } from '../../infra/gateways'
import styles from '../../application/styles/post.module.scss'

type Props = {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: Date
  }
}

export default function Post({ post }: Props) {
  return (
    <>
      <Head>
        <title>{post.title} | DevNews</title>
      </Head>
      <main className={styles.post_container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{`${post.updatedAt}`}</time>
          <div className={styles.post_content} dangerouslySetInnerHTML={{ __html: post.content }}/>
        </article>
      </main>
    </>
  )
} 

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { slug } = params
  const prismic = getPrismicClient(req)
  const response = await prismic.getByUID('post', String(slug), {})
  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date)
        .toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  }
  
  // if(status!== 'authenticated') {
    
  // }
  return {
    props: {
      post
    }
  }
}