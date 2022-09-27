import { trpc } from "../initTRPC";
import { isLoggedin } from "../middlewares/isLoggedIn";

export const requireLoggedInProcedure = trpc.procedure.use(isLoggedin);
