import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";
import stripe from "@abuse-sleuth/stripe";

type PlanLimits = {
    reportsLimit: number;
    scansLimit: number;
    usersLimit: number;
    reportRetentionLimit: number;
};

export const getPlanLimitsFromTeam = async (
    teamId: string
): Promise<PlanLimits> => {
    const { stripeSubId } = await prisma.team.findUniqueOrThrow({
        select: {
            stripeSubId: true,
        },
        where: {
            id: teamId,
        },
    });

    const stripeSubscription = await stripe.subscriptions.retrieve(
        stripeSubId ?? ""
    );

    const results = await z
        .object({
            reportsLimit: z.number(),
            scansLimit: z.number(),
            usersLimit: z.number(),
            reportRetentionLimit: z.number(),
        })
        .safeParseAsync(stripeSubscription.metadata);

    if (!results.success) {
        throw new Error("Subscription didn't contain all needed Limits");
    }

    const planLimits: PlanLimits = results.data;

    return planLimits;
};
