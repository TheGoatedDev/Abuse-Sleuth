import getCheckoutSessionController from "../../controllers/stripe/getCheckoutSession";
import processWebhookController from "../../controllers/stripe/processWebhook";
import { trpc } from "../../initTRPC";

export const stripeRouter = trpc.router({
    processWebHook: processWebhookController,
    getCheckoutSession: getCheckoutSessionController,
});
