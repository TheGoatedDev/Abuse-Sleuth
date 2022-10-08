import stripe from "@abuse-sleuth/stripe";

import { requireLoggedInProcedure } from "../../../procedures/requireLoggedInProcedure";

export const getPortalURLController = requireLoggedInProcedure.query(
    async (opts) => {
        const session = await stripe.billingPortal.sessions.create({
            customer: opts.ctx.user?.stripeCustomerId ?? "",
        });
        return session.url;
    }
);

export default getPortalURLController;
