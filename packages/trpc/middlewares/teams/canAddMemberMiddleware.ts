import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { trpc } from "../../initTRPC";
import { canAddMemberToTeam } from "../../services/stripe/canAddMemberToTeam";

export const canAddMemberMiddleware = trpc.middleware(
    async ({ ctx, next, rawInput }) => {
        const shape = z.object({
            teamId: z.string(),
        });

        const result = shape.safeParse(rawInput);

        if (!result.success) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Input missing: 'teamId'",
            });
        }

        const canAdd = await canAddMemberToTeam(result.data.teamId);

        if (!canAdd) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "You have hit your limit for Users!",
            });
        }

        return next();
    }
);
