import { NextApiRequest } from "next";
import { StytchUser } from "types/user";

import { prisma } from "@abuse-sleuth/prisma";

import getHandler from "@libs/api/handler";
import requireAuth from "@libs/api/middleware/requireAuth";
import { getSession } from "@libs/auth/authServerHelpers";
import { getStripeAdmin } from "@libs/stripe/stripeAdmin";

const handler = getHandler();

handler.use(requireAuth);

handler.post(async (req: NextApiRequest & { user?: StytchUser }, res) => {
    const user = req.user;

    const { priceID } = req.body;

    if (!priceID) {
        res.status(422).send({
            ok: false,
            error: "priceID is required.",
        });
        return;
    }

    const userBillingInfo = await prisma.userBillingInfo.findUnique({
        where: {
            userId: user.id,
        },
    });

    if (userBillingInfo.plan !== "" || userBillingInfo.plan !== null) {
        res.status(400).send({
            ok: false,
            error: "You already have a plan.",
        });
    }

    const stripe = getStripeAdmin();

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer: userBillingInfo.stripeCustomerId,
        customer_update: {
            address: "auto",
        },
        automatic_tax: {
            enabled: true,
        },
        line_items: [
            {
                price: priceID,
                quantity: 1,
            },
        ],
        success_url: `${req.headers.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/payment/cancel`,
    });

    res.status(200).json({
        ok: true,
        data: checkoutSession,
    });
});

export default handler;
