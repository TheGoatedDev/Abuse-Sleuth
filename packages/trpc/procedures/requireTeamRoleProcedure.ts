import { TeamMemberRole } from "@abuse-sleuth/prisma";

import { trpc } from "../initTRPC";
import { requiredTeamRole } from "../middlewares/requiredTeamRole";

export const requireTeamRoleProcedure = (allowedRoles: TeamMemberRole[]) =>
    trpc.procedure.use(requiredTeamRole(allowedRoles));
