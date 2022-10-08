import { inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

import {
    nextAuthOptions,
    unstable_getServerSession,
} from "@abuse-sleuth/authentication";
import { User } from "@abuse-sleuth/prisma";

type CreateContextOptions = {
    user: User | null;
};

export const createContextInner = async (_opts: CreateContextOptions) => {
    return _opts ?? { user: null };
};

export type Context = inferAsyncReturnType<typeof createContextInner>;

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
    const session = await unstable_getServerSession(req, res, nextAuthOptions);

    return await createContextInner({ user: session?.user ?? null });
};
