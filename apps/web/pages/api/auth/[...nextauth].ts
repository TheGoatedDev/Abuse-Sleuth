import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@abuse-sleuth/prisma";

import { getStripeAdmin } from "@libs/stripe/stripeAdmin";

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    secret: process.env.JWT_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/signout",
        error: "/auth/error",
    },
    callbacks: {
        async session({ session, token, user }) {
            const dbUser = await prisma.user.findUnique({
                where: {
                    email: token.email,
                },
            });
            session.user.id = dbUser.id;
            //console.log(session);
            return session;
        },
    },
    events: {
        async createUser({ user }) {
            const stripe = getStripeAdmin();

            const customer = await stripe.customers.create({
                email: user.email,
            });

            try {
                await prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        userBillingInfo: {
                            create: {
                                stripeCustomerId: customer.id,
                            },
                        },
                    },
                });
            } catch (error) {
                await prisma.user.delete({
                    where: {
                        id: user.id,
                    },
                });
                await stripe.customers.del(customer.id);
                throw error;
            }
        },
    },
});
