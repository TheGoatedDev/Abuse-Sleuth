import * as z from "zod"
import { TeamMemberRole } from "@prisma/client"
import { CompleteUser, RelatedUserModel, CompleteTeam, RelatedTeamModel } from "./index"

export const UserOnTeamModel = z.object({
  role: z.nativeEnum(TeamMemberRole),
  userId: z.string(),
  teamId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUserOnTeam extends z.infer<typeof UserOnTeamModel> {
  user: CompleteUser
  team?: CompleteTeam | null
}

/**
 * RelatedUserOnTeamModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserOnTeamModel: z.ZodSchema<CompleteUserOnTeam> = z.lazy(() => UserOnTeamModel.extend({
  user: RelatedUserModel,
  team: RelatedTeamModel.nullish(),
}))
