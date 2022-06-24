import * as trpc from "@trpc/server";
import { inferProcedureInput } from "@trpc/server";
import superjson from "superjson";

import { createRouter } from "@utils/createRouter";

import userRouter from "./userRouter";

const router = createRouter();

const appRouter = router
    .transformer(superjson)
    .query("health", {
        resolve() {
            return "I'm Working";
        },
    })
    .merge("users:", userRouter);

export { appRouter };
export type AppRouter = typeof appRouter;

export type TQuery = keyof AppRouter["_def"]["queries"];

export type InferQueryInput<TRouteKey extends TQuery> = inferProcedureInput<
    AppRouter["_def"]["queries"][TRouteKey]
>;
