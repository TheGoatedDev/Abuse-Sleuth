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

    const stripeProduct = await stripe.products.retrieve(
        stripeSubscription.items.data[0].plan.product as string
    );

    const results = await z
        .object({
            reportsLimit: z.string().transform(Number),
            scansLimit: z.string().transform(Number),
            usersLimit: z.string().transform(Number),
            reportRetentionLimit: z.string().transform(Number),
        })
        .safeParseAsync(stripeProduct.metadata);

    if (!results.success) {
        throw new Error(results.error.message);
    }

    const planLimits: PlanLimits = results.data;

    return planLimits;
};
