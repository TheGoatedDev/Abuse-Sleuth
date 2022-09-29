import addMemberController from "../../../controllers/teams/members/addMember";
import getMembersController from "../../../controllers/teams/members/getMembers";
import { trpc } from "../../../initTRPC";

export const teams_membersRouter = trpc.router({
    getMembers: getMembersController,

    addMember: addMemberController,
});
