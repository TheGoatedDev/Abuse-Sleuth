import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
} from "next";
import NextAuth, { unstable_getServerSession } from "next-auth";

import { nextAuthOptions } from "../";

export const requireAuth = (
    callback?: (
        context: GetServerSidePropsContext
    ) => Promise<GetServerSidePropsResult<any>>
): GetServerSideProps => {
    return async (context) => {
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

        if (callback) {
            return await callback(context);
        }

        return {
            props: {},
        };
    };
};

export const requireNoAuth = (
    callback?: (
        context: GetServerSidePropsContext
    ) => Promise<GetServerSidePropsResult<any>>
): GetServerSideProps => {
    return async (context) => {
        const session = await unstable_getServerSession(
            context.req,
            context.res,
            nextAuthOptions
        );
        if (session) {
            return {
                redirect: {
                    destination: `/dashboard`,
                },
                props: {},
            };
        }

        if (callback) {
            return await callback(context);
        }

        return {
            props: {},
        };
    };
};

export const NextAuthApiHandler = NextAuth;
