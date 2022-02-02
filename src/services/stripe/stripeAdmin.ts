import Stripe from "stripe";

export const stripeAdmin = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2020-08-27",
});
