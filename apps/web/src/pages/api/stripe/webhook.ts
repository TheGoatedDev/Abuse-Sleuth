import { buffer, RequestHandler } from "micro";
import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";

import { appRouter } from "@abuse-sleuth/trpc";

const cors = Cors({
    allowMethods: ["POST", "HEAD"],
});

export const config = {
    api: {
        bodyParser: false,
    },
};

const stripeWebhookHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
        return;
    }

    try {
        const caller = appRouter.createCaller({ user: null });

        const buf = await buffer(req);
        const sig = req.headers["stripe-signature"]!;

        await caller.stripe.processWebHook({
            bufferString: buf.toString(),
            signature: sig as string,
        });

        res.status(200).send("");
    } catch (err) {
        const errorMessage =
            err instanceof Error ? err.message : "Unknown error";
        // On error, log and return the error message.
        if (err! instanceof Error) console.log(err);
        console.log(`❌ Error message: ${errorMessage}`);
        res.status(400).send(`Webhook Error: ${errorMessage}`);
        return;
    }
};

export default cors(stripeWebhookHandler as RequestHandler);
