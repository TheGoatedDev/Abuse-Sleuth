import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@abuse-sleuth/prisma"

export const nextAuthOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.NEXTAUTH_GOOGLE_ID ?? "",
            clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET ?? "",
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
        }),
        GithubProvider({
            clientId: process.env.NEXTAUTH_GITHUB_ID ?? "",
            clientSecret: process.env.NEXTAUTH_GITHUB_SECRET ?? "",
        })
    ],
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
        newUser: "/auth/new-user"
    }
}

export { unstable_getServerSession} from 'next-auth'

export const NextAuthApiHandler = NextAuth;
