import Stripe from "stripe";

import EnvConfig from "@utils/configs/env";

export const getStripeAdmin = () => {
    const stripe = new Stripe(EnvConfig.stripe.secretKey, {
        apiVersion: "2020-08-27",
    });
    return stripe;
};
