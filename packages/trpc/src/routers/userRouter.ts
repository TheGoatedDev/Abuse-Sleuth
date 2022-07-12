import { TRPCError } from "@trpc/server";

import { createRouter } from "../utils/createRouter";

const router = createRouter();

const userRouter = router
    .middleware(({ ctx, meta, next }) => {
        if (meta?.requireAuth) {
            if (!ctx.user) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "User not Authenticated",
                });
            }
        }

        return next();
    })
    .query("me", {
        meta: {
            requireAuth: true,
        },
        async resolve({ input, ctx }) {
            return ctx.user;
        },
    });

export default userRouter;
