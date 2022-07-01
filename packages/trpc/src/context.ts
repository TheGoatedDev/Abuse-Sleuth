import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export function createContext({ req, res }: CreateFastifyContextOptions) {
    const accessToken = req.headers.authorization?.split(" ")[1] ?? undefined;

    return { req, res, accessToken };
}

export type Context = inferAsyncReturnType<typeof createContext>;
