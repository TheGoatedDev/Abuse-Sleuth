import { removeCookies } from "cookies-next";

import getHandler from "@libs/api/handler";
import EnvConfig from "@libs/configs/env";


const handler = getHandler();

handler.all(async (req, res) => {
    removeCookies("token", {
        req,
        res,
        path: "/",
        httpOnly: true,
        secure: EnvConfig.isProduction,
    });

    return res.status(200).send({
        ok: true,
        data: "Logged Out",
    });
});

export default handler;
