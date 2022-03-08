import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import getHandler from "@libs/api/handler";
import { getStripeAdmin } from "@libs/stripe/stripeAdmin";

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = getHandler();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const sig = req.headers["stripe-signature"]!;

    const stripe = getStripeAdmin();

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            await buffer(req),
            sig,
            process.env.STRIPE_WEBHOOK_SIGNING_SECRET!
        );
    } catch (error: any) {
        console.error("Stripe Webhook Hander", error);
        res.status(400).send({
            ok: false,
            error: `Webhook Error: ${error.message}`,
        });
        return;
    }

    console.log("Stripe Webhook Hander", event);

    res.send({
        ok: true,
        data: event,
    });
});

export default handler;
