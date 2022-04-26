import { setCookies } from "cookies-next";
import dayjs from "dayjs";

import { StytchClient } from "@abuse-sleuth/auth";

import getHandler from "@libs/api/handler";
import requireValidation from "@libs/api/middleware/requireValidation";
import EnvConfig from "@libs/configs/env";
import { createUser } from "@libs/database/user/createUser";
import { oauthAuthenticateSchema } from "@libs/validationSchemas/oauthAuthenticateSchema";

const handler = getHandler();

handler.use(requireValidation({ bodySchema: oauthAuthenticateSchema }));

handler.post(async (req, res) => {
    const token: string = req.body.token;

    try {
        // Checks if he Authentication token is valid and returns response
        const oauthRes = await StytchClient.oauth.authenticate(token, {
            session_duration_minutes: 60 * 24 * 7,
            session_management_type: "stytch",
        });

        // Gets the user from stytch with the user_id from oauthRes
        const user = await StytchClient.users.get(oauthRes.user_id);

        // Creates all User Models for user if they are not present
        await createUser(oauthRes.user_id, user.emails[0].email);

        // Set the Cookie after the user has been authenticated and precheck have ran.
        setCookies("token", oauthRes.session.stytch_session.session_jwt, {
            req,
            res,
            path: "/",
            httpOnly: true,
            secure: EnvConfig.isProduction,
            expires: dayjs().add(7, "day").toDate(),
        });

        return res.status(200).send({
            ok: true,
            data: "Authenticated",
        });
    } catch (error) {
        console.error(
            error.error_message || error || "Failed to authenticate."
        );
        return res.status(400).send({
            ok: false,
            error: error.error_message || error || "Failed to authenticate.",
        });
    }
});

export default handler;
