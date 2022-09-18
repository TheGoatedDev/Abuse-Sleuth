import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@abuse-sleuth/prisma";
import stripe, { Stripe } from "@abuse-sleuth/stripe";

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
        newUser: "/auth/newuser",
    },
    callbacks: {
        session: async (context) => {
            if (!context.user.email) {
                throw new Error("No user found.");
            }

            const dbUser = await prisma.user.findUnique({
                where: { email: context.user.email },
            });

            context.session.user.context.session.user = dbUser;

            return context.session;
        },
    },
    events: {
        createUser: async ({ user }) => {
            try {
                const stripeCustomer = await stripe.customers.create({
                    email: user.email as string,
                    metadata: {
                        databaseUserId: user.id,
                    },
                });

                const stripeProducts = await stripe.products.list({
                    active: true,
                    expand: ["data.default_price"],
                });

                const sortedProducts = stripeProducts.data.sort((a, b) => {
                    const aPrice = a.default_price as Stripe.Price;
                    const bPrice = b.default_price as Stripe.Price;

                    return (
                        (aPrice.unit_amount ?? 0) - (bPrice.unit_amount ?? 0)
                    );
                });

                const stripeSub = await stripe.subscriptions.create({
                    customer: stripeCustomer.id,
                    items: [
                        {
                            price: (
                                sortedProducts[0].default_price as Stripe.Price
                            ).id,
                        },
                    ],
                });

                const team = await prisma.team.create({
                    data: {
                        teamName: "Personal",
                        locked: true,
                        stripeSubId: stripeSub.id,
                        users: {
                            create: {
                                role: "OWNER",
                                user: {
                                    connect: {
                                        id: user.id as string,
                                    },
                                },
                            },
                        },
                    },
                });

                await prisma.user.update({
                    data: {
                        activeTeamId: team.id,
                        stripeCustomerId: stripeCustomer.id,
                    },
                    where: {
                        email: user.email as string,
                    },
                });
            } catch (error) {
                throw new Error(error);
            }
        },
    },
};

export * from "next-auth";
