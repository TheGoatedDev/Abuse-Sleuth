import dayjs from "dayjs";
import { Router } from "express";

import { StytchClient } from "@abuse-sleuth/auth";

const authenticateController = Router();

authenticateController.post("/", async (req, res) => {
    //console.log(JSON.stringify(req.body, null, 2));
    const token: string = req.body.token;

    try {
        const oauthRes = await StytchClient.oauth.authenticate(token, {
            session_duration_minutes: 60 * 24 * 7,
            session_management_type: "stytch",
        });

        const user = await StytchClient.users.get(oauthRes.user_id);

        //await createUser(oauthRes.user_id, user.emails[0].email);

        // console.log(JSON.stringify(oauthRes, null, 2));

        // Set the Cookie after the user has been authenticated and precheck have ran.
        res.cookie("token", oauthRes.session?.stytch_session?.session_jwt, {
            domain: "localhost",
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: dayjs().add(7, "day").toDate(),
            sameSite: "none",
        });

        //console.log(oauthRes.session?.stytch_session?.session_jwt);

        return res.status(200).send({
            ok: true,
            data: "Authenticated",
        });
    } catch (err) {
        const error = err as any;
        console.error(
            error.error_message || error || "Failed to authenticate."
        );
        return res.status(400).send({
            ok: false,
            error: error.error_message || error || "Failed to authenticate.",
        });
    }
});

export default authenticateController;
