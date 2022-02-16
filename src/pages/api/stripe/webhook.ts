import runMiddleware from "@libs/helpers/runMiddleware";
import checkMethod from "@libs/middlewares/checkMethod";
import Logger from "@libs/utils/Logger";
import { getStripeAdmin } from "@services/stripe/stripeAdmin";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<GenericHTTPResponse>
) => {
    await runMiddleware(req, res, checkMethod(["POST"]));

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
        Logger.error("Stripe Webhook Hander", error);
        res.status(400).send({
            ok: false,
            data: `Webhook Error: ${error.message}`,
        });
        return;
    }

    Logger.debug("Stripe Webhook Hander", event);

    res.send({
        ok: true,
        data: event,
    });
};

export default handler;
