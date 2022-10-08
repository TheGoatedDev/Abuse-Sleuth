import createController from "../../controllers/teams/create";
import editController from "../../controllers/teams/edit";
import { getController } from "../../controllers/teams/get";
import getAllSelfController from "../../controllers/teams/getAllSelf";
import { trpc } from "../../initTRPC";
import { teams_membersRouter } from "./members";

export const teamsRouter = trpc.router({
    members: teams_membersRouter,

    getAllSelf: getAllSelfController,

    get: getController,
    edit: editController,
    create: createController,
});
