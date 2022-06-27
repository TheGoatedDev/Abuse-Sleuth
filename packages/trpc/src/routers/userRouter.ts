import { z } from "zod";

import { loginUser, registerUser } from "@abuse-sleuth/auth";

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
        async resolve({ input }) {
            return {
                username: `Abyss${Math.round(Math.random() * 1000)}`,
            };
        },
    })
    .mutation("login", {
        input: z.object({
            email: z.string().email(),
            password: z.string().min(8),
        }),
        async resolve({ input, ctx }) {
            const userSession = await loginUser(input.email, input.password);
            return {
                idToken: userSession.getIdToken().getJwtToken(),
                accessToken: userSession.getAccessToken().getJwtToken(),
                refreshToken: userSession.getRefreshToken().getToken(),
            };
        },
    })
    .mutation("register", {
        input: z.object({
            email: z.string().email(),
            password: z.string().min(8),
        }),
        async resolve({ input }) {
            const username = await registerUser(input.email, input.password);
            return {
                username: username,
            };
        },
    });

export default userRouter;
