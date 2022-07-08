import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { awsCognitoAuth } from "@abuse-sleuth/auth";

import { createRouter } from "../utils/createRouter";

const router = createRouter();

const userRouter = router
    .middleware(async ({ ctx, meta, next }) => {
        if (meta?.requireAuth && !ctx.user) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "User not Authenticated",
            });
        }

        return next();
    })
    .query("me", {
        async resolve({ input, ctx }) {
            return ctx.user;
        },
    });

export default userRouter;
