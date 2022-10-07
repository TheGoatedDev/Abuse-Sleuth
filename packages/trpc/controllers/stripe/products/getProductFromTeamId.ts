import { z } from "zod";

import { prisma } from "@abuse-sleuth/prisma";
import stripe from "@abuse-sleuth/stripe";
import { Stripe } from "@abuse-sleuth/stripe/Stripe";

import { requiredTeamRoleMiddleware } from "../../../middlewares/teams/requiredTeamRoleMiddleware";
import { requireLoggedInProcedure } from "../../../procedures/requireLoggedInProcedure";

export const getProductFromTeamIdController = requireLoggedInProcedure
    .use(requiredTeamRoleMiddleware(["OWNER"]))
    .input(
        z.object({
            teamId: z.string(),
        })
    )
    .query(async ({ input, ctx }) => {
        const team = await prisma.team.findUnique({
            where: {
                id: input.teamId,
            },
        });

        const subscription: Stripe.Subscription =
            await stripe.subscriptions.retrieve(team!.stripeSubId!, {
                expand: ["items.data.plan.product"],
            });

        const product = subscription.items.data[0].plan
            .product as Stripe.Product;

        return product;
    });

export default getProductFromTeamIdController;
