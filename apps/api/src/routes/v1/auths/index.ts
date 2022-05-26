import dayjs from "dayjs";
import { Router } from "express";

import { StytchClient } from "@abuse-sleuth/auth";

const v1AuthRouter = Router();

v1AuthRouter.post("/", async (req, res) => {
    const token: string = req.body.token;
    console.log(req.body);
    try {
        // Checks if he Authentication token is valid and returns response
        const oauthRes = await StytchClient.oauth.authenticate(token, {
            session_duration_minutes: 60 * 24 * 7,
            session_management_type: "stytch",
        });

        // Gets the user from stytch with the user_id from oauthRes
        const user = await StytchClient.users.get(oauthRes.user_id);

        // Creates all User Models for user if they are not present
        console.log(user);
        //await createUser(oauthRes.user_id, user.emails[0].email); TODO: ADD THIS

        // Set the Cookie after the user has been authenticated and precheck have ran.
        res.cookie("token", oauthRes.session?.stytch_session?.session_jwt, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            expires: dayjs().add(7, "day").toDate(),
        });

        return res.status(200).send({
            ok: true,
            data: "Authenticated",
        });
    } catch (error: any) {
        console.error(
            error.error_message || error || "Failed to authenticate."
        );
        return res.status(400).send({
            ok: false,
            error: error.error_message || error || "Failed to authenticate.",
        });
    }
});

export { v1AuthRouter };
export default v1AuthRouter;
