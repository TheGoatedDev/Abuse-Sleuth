import { setCookies } from "cookies-next";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";

import { StytchClient } from "@abuse-sleuth/auth";

import getHandler from "@libs/api/handler";

const handler = getHandler();

handler.post(async (req, res) => {
    const token: string = req.body.token;

    try {
        const magicLinkRes = await StytchClient.magicLinks.authenticate(token, {
            session_duration_minutes: 60 * 24 * 7,
        });

        console.log(JSON.stringify(magicLinkRes, null, 4));

        //console.log(jwtToken);

        setCookies("token", magicLinkRes.session_jwt, {
            req,
            res,
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: dayjs().add(7, "day").toDate(),
        });

        return res.status(200).send({
            ok: true,
            data: "Authenticated",
        });
    } catch (error) {
        return res.status(400).send({
            ok: false,
            error: error.error_message,
        });
    }
});

export default handler;
