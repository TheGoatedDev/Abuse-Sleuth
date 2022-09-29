import createController from "../../controllers/teams/create";
import { getController } from "../../controllers/teams/get";
import getActiveSelfController from "../../controllers/teams/getActiveSelf";
import getAllSelfController from "../../controllers/teams/getAllSelf";
import { trpc } from "../../initTRPC";
import { teams_membersRouter } from "./members";

export const teamsRouter = trpc.router({
    members: teams_membersRouter,

    getAllSelf: getAllSelfController,

    get: getController,

    getActiveSelf: getActiveSelfController,

    create: createController,
});
