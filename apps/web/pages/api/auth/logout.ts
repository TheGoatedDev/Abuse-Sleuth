import { removeCookies } from "cookies-next";

import getHandler from "@libs/api/handler";

const handler = getHandler();

handler.all(async (req, res) => {
    removeCookies("token", {
        req,
        res,
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).send({
        ok: true,
        data: "Logged Out",
    });
});

export default handler;
