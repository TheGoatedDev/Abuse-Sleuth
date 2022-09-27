import { TRPCError } from "@trpc/server";

import { trpc } from "../initTRPC";

export const isLoggedin = trpc.middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
        throw new TRPCError({
            message: "No User Session Found",
            code: "UNAUTHORIZED",
        });
    } else {
        if (!ctx.session.user) {
            throw new TRPCError({
                message: "No User Found in Session",
                code: "UNAUTHORIZED",
            });
        }
    }

    return next({
        ctx,
    });
});
