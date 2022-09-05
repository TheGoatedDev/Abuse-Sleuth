import { GetServerSideProps } from "next";
import NextAuth, { unstable_getServerSession } from "next-auth";

import { nextAuthOptions } from "../";

export const requireAuth: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        nextAuthOptions
    );
    if (!session) {
        return {
            redirect: {
                destination: `/auth/signin?callbackUrl=${encodeURIComponent(
                    context.resolvedUrl
                )}`,
            },
            props: {},
        };
    }

    return {
        props: {},
    };
};

export const requireNoAuth: GetServerSideProps = async (
    context,
    callback?: Promise<GetServerSideProps>
) => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        nextAuthOptions
    );
    if (session) {
        return {
            redirect: {
                destination: "/dashboard",
            },
            props: {},
        };
    }

    if (callback) {
        return (await callback)(context);
    } else {
        return {
            props: {},
        };
    }
};

export const NextAuthApiHandler = NextAuth;
