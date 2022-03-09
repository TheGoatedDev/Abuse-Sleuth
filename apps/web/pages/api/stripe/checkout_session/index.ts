import { getSession } from "next-auth/react";

import getHandler from "@libs/api/handler";
import requireAuth from "@libs/api/middleware/requireAuth";
import { getStripeAdmin } from "@libs/stripe/stripeAdmin";

const handler = getHandler();

handler.use(requireAuth);

handler.post(async (req, res) => {
    const session = await getSession({ req });

    const { priceID } = req.body;

    if (!priceID) {
        res.status(422).send({
            ok: false,
            error: "priceID is required.",
        });
        return;
    }

    const userPaymentInfo = await prisma.userPaymentPlan.findUnique({
        where: {
            userId: session.user.id,
        },
    });

    const stripe = getStripeAdmin();

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer: userPaymentInfo.stripeCustomerId,
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
