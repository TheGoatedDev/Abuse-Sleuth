import { trpc } from "../initTRPC";
import { teamsRouter } from "./teams";
import { usersRouter } from "./users";

export const appRouter = trpc.router({
    teams: teamsRouter,
    users: usersRouter,
});

export type AppRouter = typeof appRouter;
