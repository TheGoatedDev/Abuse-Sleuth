import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
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
    callbacks: {
        session: async (context) => {
            if (!context.user.email) {
                throw new Error("No user found.");
            }

            const dbUser = await prisma.user.findUnique({
                where: { email: context.user.email },
            });

            context.session.user = dbUser;

            return context.session;
        },
    },
    events: {
        createUser: async ({ user }) => {
            const team = await prisma.team.create({
                data: {
                    teamName: "Personal",
                    locked: true,
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
                },
                where: {
                    email: user.email as string,
                },
            });
        },
    },
};

export * from "next-auth";
