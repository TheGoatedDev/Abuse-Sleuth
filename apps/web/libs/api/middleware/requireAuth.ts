import { NextApiRequest, NextApiResponse } from "next";
import { GenericHTTPResponse, NextApiRequestWithUser } from "types/http";

import { getSession } from "@libs/auth/authServerHelpers";

export const requireAuth = async (
    req: NextApiRequestWithUser,
    res: NextApiResponse<GenericHTTPResponse>,
    next: any
) => {
    try {
        const user = await getSession(req, res);

        req.user = user;

        next();
    } catch (error) {
        return res.status(400).send({
            ok: false,
            error: error,
        });
    }
};

export default requireAuth;
