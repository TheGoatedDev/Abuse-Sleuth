import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
} from "next";
import NextAuth, {
    NextAuthOptions,
    unstable_getServerSession,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@abuse-sleuth/prisma";

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
                    response_type: "code",
                },
            },
        }),
        GithubProvider({
            clientId: process.env.NEXTAUTH_GITHUB_ID ?? "",
            clientSecret: process.env.NEXTAUTH_GITHUB_SECRET ?? "",
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
        newUser: "/auth/new-user",
    },
};

export const requireAuth: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        nextAuthOptions
    );
    if (!session) {
        return {
            redirect: {
                destination: `/auth/signin?callbackUrl=${encodeURIComponent(context.resolvedUrl)}`,
            },
            props: {},
        };
    }

    return {
        props: {},
    };
};

export const requireNoAuth: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        nextAuthOptions
    );
    if (!session) {
        return {
            redirect: {
                destination: "/dashboard",
            },
            props: {},
        };
    }

    return {
        props: {},
    };
};

export { unstable_getServerSession } from "next-auth";

export const NextAuthApiHandler = NextAuth;
