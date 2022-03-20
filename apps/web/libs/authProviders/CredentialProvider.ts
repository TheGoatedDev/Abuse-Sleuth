import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@abuse-sleuth/prisma";

import { verifyPassword } from "@libs/auth";

const myCredentialsProvider = CredentialsProvider({
    id: "credentials",
    name: "Abuse Sleuth",
    type: "credentials",
    credentials: {
        email: {
            label: "Email Address",
            type: "email",
            placeholder: "john.doe@example.com",
        },
        password: {
            label: "Password",
            type: "password",
            placeholder: "password123",
        },
        totp: { label: "TOTP", type: "text", placeholder: "123456" },
    },
    authorize: async (credentials) => {
        console.log("Authorizing credentials", credentials);
        if (!credentials) {
            console.error("No credentials provided somehow");
            throw new Error("Internal Server Error");
        }

        const user = await prisma.user.findUnique({
            where: {
                email: credentials.email.toLowerCase(),
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        if (!user.password) {
            throw new Error("User does not have a password");
        }

        if (
            (await verifyPassword(credentials.password, user.password)) ===
            false
        ) {
            throw new Error("Incorrect password");
        }

        console.log("User authorized", user);

        return {
            id: user.id,
            username: user.username,
            email: user.email,
        };
    },
});

export default myCredentialsProvider;
