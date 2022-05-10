import { Stripe, loadStripe } from "@stripe/stripe-js";

import EnvConfig from "@utils/configs/env";

let stripePromise: Promise<Stripe | null>;
const getStripeClient = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(EnvConfig.public.stripe.publicKey);
    }
    return stripePromise;
};

export default getStripeClient;
