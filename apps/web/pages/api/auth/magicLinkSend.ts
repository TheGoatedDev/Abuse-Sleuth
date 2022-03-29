import { StytchError } from "stytch";

import { StytchClient } from "@abuse-sleuth/auth";

import getHandler from "@libs/api/handler";
import { ROUTES } from "@libs/configs/routes";

const handler = getHandler();

handler.post(async (req, res) => {
    const email: string = req.body.email;

    try {
        const magicLinkRes = await StytchClient.magicLinks.email.loginOrCreate({
            email,
            login_magic_link_url: `${ROUTES.baseURL}${ROUTES.auth.login}`,
            signup_magic_link_url: `${ROUTES.baseURL}${ROUTES.auth.login}`,
        });

        res.status(200).send({
            ok: true,
            data: `Magic Link Sent to ${email}`,
        });
    } catch (error) {
        res.status(400).send({
            ok: false,
            error: error.error_message,
        });
    }
});

export default handler;
