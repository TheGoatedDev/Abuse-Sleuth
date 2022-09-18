import * as z from "zod";

import {
    CompleteUserOnTeam,
    RelatedUserOnTeamModel,
    CompleteUser,
    RelatedUserModel,
} from "./index";

export const TeamModel = z.object({
    id: z.string(),
    stripeSubId: z.string().nullish(),
    teamName: z.string(),
    locked: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export interface CompleteTeam extends z.infer<typeof TeamModel> {
    users: CompleteUserOnTeam[];
    User: CompleteUser[];
}

/**
 * RelatedTeamModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTeamModel: z.ZodSchema<CompleteTeam> = z.lazy(() =>
    TeamModel.extend({
        users: RelatedUserOnTeamModel.array(),
        User: RelatedUserModel.array(),
    })
);
