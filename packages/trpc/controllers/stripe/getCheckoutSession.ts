import { z } from "zod";

import stripe from "@abuse-sleuth/stripe";

import { requireLoggedInProcedure } from "../../procedures/requireLoggedInProcedure";

export const getCheckoutSessionController = requireLoggedInProcedure
    .input(
        z.object({
            teamId: z.string(),
            productId: z.string(),
            checkout: z.object({
                cancel_url: z.string(),
                success_url: z.string(),
            }),
        })
    )
    .mutation(async ({ input, ctx }) => {
        // Get Product
        const product = await stripe.products.retrieve(input.productId);
        // Get Default Pricing
        const defaultPricingId = product.default_price as string;
        // Create a Checkout Session
        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            // URL Info
            cancel_url: input.checkout.cancel_url,
            success_url: input.checkout.success_url,
            // Customer
            customer: ctx.user!.stripeCustomerId!,

            // Billing Address Requirement
            billing_address_collection: "required",

            // Subscription Items
            line_items: [
                {
                    price: defaultPricingId,
                },
            ],
        });

        // Send back Checkout Session
        return checkoutSession.url;
    });

export default getCheckoutSessionController;
