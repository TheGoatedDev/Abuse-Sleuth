import * as z from "zod"
import { TeamMemberRole } from "@prisma/client"
import { CompleteUser, RelatedUserModel, CompleteTeam, RelatedTeamModel } from "./index"

export const TeamMemberModel = z.object({
  role: z.nativeEnum(TeamMemberRole),
  userId: z.string(),
  teamId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteTeamMember extends z.infer<typeof TeamMemberModel> {
  user: CompleteUser
  team?: CompleteTeam | null
}

/**
 * RelatedTeamMemberModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTeamMemberModel: z.ZodSchema<CompleteTeamMember> = z.lazy(() => TeamMemberModel.extend({
  user: RelatedUserModel,
  team: RelatedTeamModel.nullish(),
}))
