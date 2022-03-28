import { NextApiRequest } from "next";
import { StytchUser } from "types/user";

import getHandler from "@libs/api/handler";
import requireAuth from "@libs/api/middleware/requireAuth";

const handler = getHandler();

handler.use(requireAuth);

handler.all(async (req: NextApiRequest & { user: StytchUser }, res) => {
    const user = req.user;

    return res.status(200).send({
        ok: true,
        data: user,
    });
});

export default handler;
