import getHandler from "@libs/api/handler";
import { hashPassword } from "@libs/auth";
import { createUser } from "@libs/database/user/createUser";
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

    try {
        const user = await createUser(username, formattedEmail, password);
    } catch (error) {
        throw error;
    }

    res.status(201).json({
        ok: true,
        data: "User created",
    });
});

export default handler;
