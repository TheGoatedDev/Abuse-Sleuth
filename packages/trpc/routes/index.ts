import { trpc } from "../initTRPC";
import { stripeRouter } from "./stripe";
import { teamsRouter } from "./teams";
import { usersRouter } from "./users";

export const appRouter = trpc.router({
    teams: teamsRouter,
    users: usersRouter,
    stripe: stripeRouter,
});

export type AppRouter = typeof appRouter;
