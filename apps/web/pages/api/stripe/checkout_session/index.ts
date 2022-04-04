import { NextApiRequestWithUser } from "types/http";

import { prisma } from "@abuse-sleuth/prisma";

import getHandler from "@libs/api/handler";
import requireAuth from "@libs/api/middleware/requireAuth";
import requireValidation from "@libs/api/middleware/requireValidation";
import { getStripeAdmin } from "@libs/stripe/stripeAdmin";
import { stripeCheckoutSchema } from "@libs/validationSchemas/stripeCheckoutSchema";

const handler = getHandler();

handler.use(requireAuth);
handler.use(requireValidation({ bodySchema: stripeCheckoutSchema }));

handler.post(async (req: NextApiRequestWithUser, res) => {
    const user = req.user;

    const { priceID } = req.body;

    const userBillingInfo = await prisma.userBillingInfo.findUnique({
        where: {
            userId: user.id,
        },
    });

    if (
        userBillingInfo.plan !== "Free" &&
        userBillingInfo.plan !== "" &&
        userBillingInfo.plan !== null
    ) {
        return res.status(400).send({
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

    return res.status(200).json({
        ok: true,
        data: checkoutSession,
    });
});

export default handler;
