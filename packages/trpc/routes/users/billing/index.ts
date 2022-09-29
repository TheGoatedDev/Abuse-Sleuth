import stripe from "@abuse-sleuth/stripe";

import { trpc } from "../../../initTRPC";
import { requireLoggedInProcedure } from "../../../procedures/requireLoggedInProcedure";

export const usersBillingRouter = trpc.router({
    getPortalURL: requireLoggedInProcedure.query(async (opts) => {
        const session = await stripe.billingPortal.sessions.create({
            customer: opts.ctx.user?.stripeCustomerId ?? "",
        });
        return session.url;
    }),
});
