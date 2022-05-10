import createHandler from "@libs/api/handler";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import { prisma } from "@abuse-sleuth/prisma";

import { getStripeAdmin } from "@services/stripe/stripeAdmin";
import EnvConfig from "@utils/configs/env";

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = createHandler();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    // Gets the Stripes Webhook Signature from the headers
    const sig = req.headers["stripe-signature"]!;

    // Gets a Stripe Admin instance
    const stripe = getStripeAdmin();

    // Declares a Stripe Event
    let event: Stripe.Event;

    // Constructs the Webhook Event and validates the signature.
    try {
        event = stripe.webhooks.constructEvent(
            await buffer(req),
            sig,
            EnvConfig.stripe.signingSecret
        );
    } catch (error: any) {
        console.error("Stripe Webhook Hander", error);
        res.status(400).send({
            ok: false,
            error: `Webhook Error: ${error.message}`,
        });
        return;
    }

    //console.log("Stripe Webhook Hander", event.type);

    // Handle Event
    switch (event.type) {
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
            const subscription = event.data.object as Stripe.Subscription;
            const customerID = subscription.customer.toString();
            const productID =
                subscription.items.data[0].price.product.toString();
            const product = await stripe.products.retrieve(productID);

            await prisma.userBillingInfo.update({
                where: {
                    stripeCustomerId: customerID,
                },
                data: {
                    plan:
                        subscription.status === "active"
                            ? product.name
                            : undefined,
                },
            });

            break;

        default:
            break;
    }

    res.send({
        ok: true,
        data: event,
    });
});

export default handler;
