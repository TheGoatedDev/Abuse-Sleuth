import { User } from "@prisma/client";

import { Stripe } from "@abuse-sleuth/stripe";

export interface UserWithStripeCustomer extends User {
    stripeCustomer?: Stripe.Customer;
}
