import { TRPCError } from "@trpc/server";

import { trpc } from "../../initTRPC";

export const isLoggedinMiddleware = trpc.middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({
            message: "No User Session Found",
            code: "UNAUTHORIZED",
        });
    }

    return next({
        ctx,
    });
});
