import { TRPCError } from "@trpc/server";
import { z } from "zod";

import stripe, { Stripe } from "@abuse-sleuth/stripe";

import { trpc } from "../../initTRPC";

export const stripeRouter = trpc.router({
    processWebHook: trpc.procedure
        .input(
            z.object({
                bufferString: z.string(),
                signature: z.string(),
            })
        )
        .mutation(({ input, ctx }) => {
            const StripeWebhookSecret = process.env["STRIPE_WEBHOOK_SECRET"]!;

            let event: Stripe.Event;

            try {
                event = stripe.webhooks.constructEvent(
                    input.bufferString,
                    input.signature,
                    StripeWebhookSecret
                );
            } catch (error) {
                const errorMessage =
                    error instanceof
                    Stripe.errors.StripeSignatureVerificationError
                        ? error.message
                        : "Unknown Error";
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: errorMessage,
                });
            }
        }),
});
