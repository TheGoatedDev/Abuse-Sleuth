import * as z from "zod"
import { CompleteTeamMember, RelatedTeamMemberModel, CompleteUser, RelatedUserModel } from "./index"

export const TeamModel = z.object({
  id: z.string(),
  stripeSubId: z.string().nullish(),
  teamName: z.string(),
  canBillingTeam: z.boolean(),
  canDeleteTeam: z.boolean(),
  canEditTeam: z.boolean(),
  canAddMember: z.boolean(),
  canScan: z.boolean(),
  canGenerateReport: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteTeam extends z.infer<typeof TeamModel> {
  members: CompleteTeamMember[]
  User: CompleteUser[]
}

/**
 * RelatedTeamModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTeamModel: z.ZodSchema<CompleteTeam> = z.lazy(() => TeamModel.extend({
  members: RelatedTeamMemberModel.array(),
  User: RelatedUserModel.array(),
}))
