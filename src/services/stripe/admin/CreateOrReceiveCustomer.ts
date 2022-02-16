import { User } from "firebase/auth";
import { getStripeAdmin } from "../stripeAdmin";

export const CreateOrReceiveCustomerID = async (user: User) => {
    const stripe = getStripeAdmin();

    const customer = stripe.customers.create({
        email: user.email!,
        metadata: {
            userID: user.uid,
        },
    });
};
