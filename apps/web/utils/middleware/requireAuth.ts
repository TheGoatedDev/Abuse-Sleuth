import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "@abuse-sleuth/auth";

export const requireAuth = async (
    req: NextApiRequestWithUser,
    res: NextApiResponse<GenericHTTPResponse>,
    next: any
) => {
    try {
        // Getting the Token from Cookies
        const token = getCookie("token", { req });

        // Checking Stytch for Token and returns User
        const user = await getSession(token.toString());

        // Make Request contain user for further use
        req.user = user;

        next();
    } catch (error) {
        // Error if Above fails
        return res.status(401).send({
            ok: false,
            error: error,
        });
    }
};

export default requireAuth;
