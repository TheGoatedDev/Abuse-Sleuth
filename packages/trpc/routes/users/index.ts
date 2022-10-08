import getActiveTeamSelfController from "../../controllers/users/getActiveTeamSelf";
import getSelfController from "../../controllers/users/getSelf";
import setActiveTeamSelfController from "../../controllers/users/setActiveTeamSelf";
import { trpc } from "../../initTRPC";
import { usersBillingRouter } from "./billing";

export const usersRouter = trpc.router({
    billing: usersBillingRouter,

    getSelf: getSelfController,

    setActiveTeamSelf: setActiveTeamSelfController,
    getActiveTeamSelf: getActiveTeamSelfController,
});
