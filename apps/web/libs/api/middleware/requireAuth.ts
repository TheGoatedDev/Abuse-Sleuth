import { NextApiRequest, NextApiResponse } from "next";
import { StytchUser } from "types/user";

import { getSession } from "@libs/auth/authServerHelpers";

export const requireAuth = async (
    req: NextApiRequest & { user?: StytchUser },
    res: NextApiResponse<GenericHTTPResponse>,
    next: any
) => {
    try {
        const stytchUser = await getSession(req, res);

        req.user = stytchUser;

        next();
    } catch (error) {
        return res.status(400).send({
            ok: false,
            error: error,
        });
    }
};

export default requireAuth;
