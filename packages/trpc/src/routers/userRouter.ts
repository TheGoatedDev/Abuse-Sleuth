import cookie from "cookie";
import { z } from "zod";

import { awsCognitoAuth } from "@abuse-sleuth/auth";

import { createRouter } from "@utils/createRouter";

const router = createRouter();

const userRouter = router
    .query("list", {
        input: z.object({
            skip: z.number().optional(),
            limit: z.number().optional(),
        }),
        async resolve({ input }) {
            return {
                inputs: input,
                users: [Math.random() * 100],
            };
        },
    })
    .query("me", {
        async resolve({ input, ctx }) {
            const authed = await awsCognitoAuth.verifyToken(
                ctx.accessToken ?? ""
            );
            return {
                username: authed
                    ? `Abyss${Math.round(Math.random() * 1000)}`
                    : "NO AUTHINO",
            };
        },
    })
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
            // ctx.res.header(
            //     "Set-Cookie",
            //     cookie.serialize("accessToken", results.accessToken, {
            //         secure: process.env["NODE_ENV"] === "production",
            //     })
            // );
            // ctx.res.header(
            //     "Set-Cookie",
            //     cookie.serialize("refreshToken", results.refreshToken, {
            //         secure: process.env["NODE_ENV"] === "production",
            //     })
            // );
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
    });

export default userRouter;
