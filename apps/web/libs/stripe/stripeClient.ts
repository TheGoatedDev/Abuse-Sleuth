import EnvConfig from "@libs/configs/env";
import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;
const getStripeClient = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(EnvConfig.public.stripe.publicKey);
    }
    return stripePromise;
};

export default getStripeClient;
