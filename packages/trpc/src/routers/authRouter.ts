import { z } from "zod";

import { awsCognitoAuth } from "@abuse-sleuth/auth";

import { createRouter } from "../utils/createRouter";

const router = createRouter();

const authRouter = router
    .mutation("login", {
        input: z.object({
            email: z.string().email(),
            password: z.string().min(8),
        }),
        async resolve({ input, ctx }) {
            const results = await awsCognitoAuth.loginUser(
                input.email,
                input.password
            );
            ctx.response.setCookie("accessToken", results.accessToken);
            ctx.response.setCookie("refreshToken", results.refreshToken);
            return {
                ...results,
            };
        },
    })
    .mutation("register", {
        input: z.object({
            email: z.string().email(),
            password: z.string().min(8),
        }),
        async resolve({ input }) {
            const message = await awsCognitoAuth.registerUser(
                input.email,
                input.password
            );
            return {
                message,
            };
        },
    })
    .mutation("confirm", {
        input: z.object({
            email: z.string().email(),
            code: z.string(),
        }),
        async resolve({ input }) {
            const correct = await awsCognitoAuth.confirmRegistration(
                input.code,
                input.email
            );
            return {
                isConfirmed: correct,
            };
        },
    });

export default authRouter;
