import { trpc } from "../initTRPC";
import { newsRouter } from "./news";
import { stripeRouter } from "./stripe";
import { teamsRouter } from "./teams";
import { usersRouter } from "./users";

export const appRouter = trpc.router({
    teams: teamsRouter,
    users: usersRouter,
    stripe: stripeRouter,
    news: newsRouter
});

export type AppRouter = typeof appRouter;
