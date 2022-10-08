import addMemberController from "../../../controllers/teams/members/addMember";
import demoteMemberController from "../../../controllers/teams/members/demoteMember";
import getMembersController from "../../../controllers/teams/members/getMembers";
import getSelf from "../../../controllers/teams/members/getSelf";
import promoteMemberController from "../../../controllers/teams/members/promoteMember";
import removeMemberController from "../../../controllers/teams/members/removeMember";
import { trpc } from "../../../initTRPC";

export const teams_membersRouter = trpc.router({
    getSelf: getSelf,
    getMembers: getMembersController,

    addMember: addMemberController,
    removeMember: removeMemberController,

    promoteMember: promoteMemberController,
    demoteMember: demoteMemberController,
});
