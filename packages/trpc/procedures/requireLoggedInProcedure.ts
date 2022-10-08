import { trpc } from "../initTRPC";
import { isLoggedinMiddleware } from "../middlewares/auth/isLoggedInMiddleware";

export const requireLoggedInProcedure =
    trpc.procedure.use(isLoggedinMiddleware);
