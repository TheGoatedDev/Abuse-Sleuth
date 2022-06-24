import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { Context } from "context";

export type RouterMeta = {
    requireAuth?: boolean;
};

export const createRouter = () => {
    return trpc
        .router<Context, RouterMeta>()
        .middleware(async ({ meta, next, ctx }) => {
            if (meta?.requireAuth !== undefined) {
                if (meta.requireAuth && !ctx.user) {
                    throw new TRPCError({
                        code: "UNAUTHORIZED",
                        cause: "Requires to be Authenticated",
                    });
                } else if (!meta.requireAuth && ctx.user) {
                    throw new TRPCError({
                        code: "FORBIDDEN",
                        cause: "Requires no Authentication!",
                    });
                }
            }

            return next();
        });
};
