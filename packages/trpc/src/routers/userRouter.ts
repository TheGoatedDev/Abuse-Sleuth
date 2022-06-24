import { z } from "zod";

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
    });

export default userRouter;
