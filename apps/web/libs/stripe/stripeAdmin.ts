import EnvConfig from "@libs/configs/env";
import Stripe from "stripe";

export const getStripeAdmin = () => {
    const stripe = new Stripe(EnvConfig.stripe.secretKey, {
        apiVersion: "2020-08-27",
    });
    return stripe;
};
