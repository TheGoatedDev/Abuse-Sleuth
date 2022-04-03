import { StytchClient } from "@abuse-sleuth/auth";
import { User, prisma } from "@abuse-sleuth/prisma";

import { getStripeAdmin } from "@libs/stripe/stripeAdmin";

import { deleteUserByID } from "./deleteUser";

export const createUser = async (stytchUserID: string, email: string) => {
    let userBillingData = await prisma.userBillingInfo.findFirst({
        where: {
            user: {
                stytchUserID: stytchUserID,
                email: email,
            },
        },
    });

    if (userBillingData === null) {
        try {
            const stripeAdmin = getStripeAdmin();
            const stytchUser = await StytchClient.users.get(stytchUserID);

            const customer = await stripeAdmin.customers.create({
                email: stytchUser.emails[0].email,
            });

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
            console.error(error);
            throw new Error(error);
        }
    }
};
