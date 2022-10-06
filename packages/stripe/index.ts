import Stripe from "stripe";

if (typeof process.env.STRIPE_SECRET === "undefined") {
    throw new Error(
        "@abuse-sleuth/stripe: STRIPE_SECRET environment var missing"
    );
}

const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: "2022-08-01",
});

export default stripe;
