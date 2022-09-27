import { inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

import {
    nextAuthOptions,
    Session,
    unstable_getServerSession,
} from "@abuse-sleuth/authentication";

type CreateContextOptions = {
    session: Session | null;
};

export const createContextInner = async (_opts: CreateContextOptions) => {
    return _opts ?? { session: null };
};

export type Context = inferAsyncReturnType<typeof createContextInner>;

export const createContext = async (opts?: CreateNextContextOptions) => {
    let session: Session | null = null;

    if (opts) {
        session = await unstable_getServerSession(
            opts.req,
            opts.res,
            nextAuthOptions
        );
    }
    return await createContextInner({ session });
};
