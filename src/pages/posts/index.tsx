import Head from 'next/head'
import styles from '../../application/styles/posts.module.scss'

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | DevNews</title>
      </Head>
      <main className={styles.preview_posts_container}>
        <div className={styles.preview_posts_list}>
          {[1,2,3,4,5,6,7,8,9].map(i => (
            <a key={i}>
              <time>12 de março de 2021</time>
              <strong>Creating a Monorepo with Lerna & Yarn Workspace</strong>
              <p>In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process</p>
            </a>
          ))}
        </div>
      </main>
    </>
  )
}