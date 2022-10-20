import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { trpc } from "../../initTRPC";
import { canDeleteTeam } from "../../services/teams/canDeleteTeam";

export const canDeleteTeamMiddleware = trpc.middleware(
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

        const canDelete = await canDeleteTeam(result.data.teamId);

        if (!canDelete) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "No Permission to Delete!",
            });
        }

        return next();
    }
);
