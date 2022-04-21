import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../../application/styles/posts.module.scss'
import { getPrismicClient } from '../../infra/gateways'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import Link from 'next/link'

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: Date
}

type Props = {
  posts: Post[]
}

export default function Posts({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Posts | DevNews</title>
      </Head>
      <main className={styles.preview_posts_container}>
        <div className={styles.preview_posts_list}>
          {posts.map(post => (
            <Link key={post.slug} href={`posts/${post.slug}`}>
              <a>
                <time>{`${post.updatedAt}`}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()
  const response = await prismic.query(
    [ Prismic.predicates.at('document.type', 'post') ], 
    { fetch: ['post.title', 'post.content'], pageSize: 10, }
  )
  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date)
        .toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    }
  })
  return  {
    props: { posts }    
  }
}   