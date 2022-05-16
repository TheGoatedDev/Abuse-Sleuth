import { removeCookies } from "cookies-next";

import EnvConfig from "@utils/configs/env";
import createHandler from "@utils/helpers/createHandler";

const handler = createHandler();

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
