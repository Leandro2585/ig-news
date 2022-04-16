import { query as q } from 'faunadb'
import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import { fauna } from '../../../infra/gateways'

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user
      try {
        await fauna.query(
          q.Create(
            q.Collection('users'),
            { data: { email } }
          )
        )
        return true
      } catch (err){
        console.log(err.requestResult)
        return false
      }
    }
  }
})