import { prisma } from "@abuse-sleuth/prisma";

import { getStripeAdmin } from "@services/stripe/stripeAdmin";

export const deleteUserByID = async (id: string) => {
    const stripe = getStripeAdmin();

    const user = await prisma.user.delete({
        where: {
            id,
        },
        include: {
            userBillingInfo: true,
        },
    });

    await stripe.customers.del(user.userBillingInfo.stripeCustomerId);

    return user;
};
