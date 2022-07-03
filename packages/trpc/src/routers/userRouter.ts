import jwt from "jsonwebtoken";
import { z } from "zod";

import { awsCognitoAuth } from "@abuse-sleuth/auth";

import { createRouter } from "../utils/createRouter";

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

            if (authed) {
                const payload = jwt.decode(ctx.accessToken as string);
                const id = (payload as jwt.JwtPayload)["username"] as string;
                const user = await awsCognitoAuth.getUserByID(id);
                return user;
            }

            throw new Error("User not Authenticated");
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

export default userRouter;
