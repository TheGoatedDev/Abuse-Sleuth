import { prisma } from "@abuse-sleuth/prisma";

import { getStripeAdmin } from "@services/stripe/stripeAdmin";

export const createUser = async (stytchUserID: string, email: string) => {
    const stripeAdmin = getStripeAdmin();

    let userBillingData = await prisma.userBillingInfo.findFirst({
        where: {
            user: {
                stytchUserID: stytchUserID,
                email: email,
            },
        },
    });

    if (userBillingData) {
        return;
    }

    const customer = await stripeAdmin.customers.create({
        email: email,
    });

    if (userBillingData === null) {
        try {
            await prisma.userBillingInfo.create({
                data: {
                    user: {
                        connectOrCreate: {
                            where: {
                                stytchUserID: stytchUserID,
                            },
                            create: {
                                stytchUserID: stytchUserID,
                                email: email,
                            },
                        },
                    },
                    stripeCustomerId: customer.id,
                },
                include: {
                    user: true,
                },
            });
        } catch (error) {
            await stripeAdmin.customers.del(customer.id);
            console.error(error);
            throw new Error(error);
        }
    }
};
