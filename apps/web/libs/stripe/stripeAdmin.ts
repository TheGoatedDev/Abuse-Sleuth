import Stripe from "stripe";

export const getStripeAdmin = () => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2020-08-27",
    });
    return stripe;
};
