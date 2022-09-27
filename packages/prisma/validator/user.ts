import * as z from "zod"
import { CompleteAccount, RelatedAccountModel, CompleteSession, RelatedSessionModel, CompleteUserOnTeam, RelatedUserOnTeamModel, CompleteTeam, RelatedTeamModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  stripeCustomerId: z.string().nullish(),
  name: z.string().nullish(),
  email: z.string(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  activeTeamId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  teams: CompleteUserOnTeam[]
  activeTeam?: CompleteTeam | null
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  accounts: RelatedAccountModel.array(),
  sessions: RelatedSessionModel.array(),
  teams: RelatedUserOnTeamModel.array(),
  activeTeam: RelatedTeamModel.nullish(),
}))
