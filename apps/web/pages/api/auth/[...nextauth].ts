import NextAuth, { Session } from "next-auth";
import { Provider } from "next-auth/providers";

import myCredentialsProvider from "@libs/authProviders/CredentialProvider";

const providers: Provider[] = [];

providers.push(myCredentialsProvider);

export default NextAuth({
    session: {
        strategy: "jwt",
    },
    secret: process.env.JWT_SECRET,
    providers,
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/signout",
        error: "/auth/error",
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && account.type === "credentials") {
                return {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                };
            }

            return token;
        },
        async session({ token, session, user }) {
            const { id, username, email } = token;
            const userSession: Session = {
                ...session,
                user: {
                    ...session.user,
                    id: id as string,
                    username: username as string,
                    email: email as string,
                },
            };
            return userSession;
        },
        async signIn({ user, account, profile }) {
            if (account.type === "credentials") {
                return true;
            }
        },
    },
});
