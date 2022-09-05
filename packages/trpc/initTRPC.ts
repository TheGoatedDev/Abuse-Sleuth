import { initTRPC } from "@trpc/server";
import superjson from "superjson";

import { Context } from "./context";

export const trpc = initTRPC.context<Context>().create({
    transformer: superjson,
});
