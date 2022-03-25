import { User, prisma } from "@abuse-sleuth/prisma";

import { hashPassword } from "@libs/auth";
import { getStripeAdmin } from "@libs/stripe/stripeAdmin";

import { deleteUserByID } from "./deleteUser";

export const createUser = async (
    username: string,
    email: string,
    password: string
) => {
    const stripe = getStripeAdmin();

    const customer = await stripe.customers.create({
        email: email,
    });

    let user: User;
    try {
        const hashedPassword = await hashPassword(password);

        user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                userBillingInfo: {
                    create: {
                        stripeCustomerId: customer.id,
                    },
                },
            },
        });

        return user;
    } catch (error) {
        await deleteUserByID(user.id);
        await stripe.customers.del(customer.id);
        throw error;
    }
};
