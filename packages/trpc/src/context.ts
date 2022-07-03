import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

import { prisma } from "@abuse-sleuth/prisma";

export function createContext({ req, res }: CreateFastifyContextOptions) {
    const accessToken = req.cookies["accessToken"] ?? undefined;

    return { req, res, accessToken, prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;
