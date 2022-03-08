import getHandler from "@libs/api/handler";
import { hashPassword } from "@libs/auth";
import prisma from "@libs/prisma";
import { getStripeAdmin } from "@libs/stripe/stripeAdmin";

const handler = getHandler();

handler.post(async (req, res) => {
    const body = req.body;
    const { username, email, password } = body;

    const formattedEmail: string = email.toLowerCase();

    if (!username) {
        res.status(422).json({
            ok: false,
            error: "Invalid Username",
        });
    }

    if (!formattedEmail || !formattedEmail.includes("@")) {
        res.status(422).json({
            ok: false,
            error: "Invalid Email",
        });
        return;
    }

    if (!password || password.length < 8) {
        res.status(422).json({ ok: false, error: "Invalid Password" });
        return;
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{ username }, { email: formattedEmail }],
        },
    });

    if (existingUser) {
        res.status(409).json({
            ok: false,
            error:
                existingUser.email === formattedEmail
                    ? "Email already in use"
                    : "Username already in use",
        });
        return;
    }

    const stripe = getStripeAdmin();

    const customer = await stripe.customers.create({
        email: formattedEmail,
    });

    const passwordHashed = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            username,
            email: formattedEmail,
            password: passwordHashed,
            stripeCustomerId: customer.id,
        },
    });

    res.status(201).json({
        ok: true,
        data: "User created",
    });
});

export default handler;
