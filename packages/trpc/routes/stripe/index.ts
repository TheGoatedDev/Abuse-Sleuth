import getCheckoutSessionController from "../../controllers/stripe/getCheckoutSession";
import processWebhookController from "../../controllers/stripe/processWebhook";
import { trpc } from "../../initTRPC";
import stripeProductsRouter from "./products";

export const stripeRouter = trpc.router({
    products: stripeProductsRouter,

    processWebHook: processWebhookController,
    getCheckoutSession: getCheckoutSessionController,
});
