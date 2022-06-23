import * as trpc from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";

export const appRouter = trpc
    .router()
    .transformer(superjson)
    .query("test", {
        input: z.string(),
        async resolve({ input }) {
            return input; // input type is string
        },
    });

// export type definition of API
export type AppRouter = typeof appRouter;
