import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const requireAuth = async (
    req: NextApiRequest,
    res: NextApiResponse<GenericHTTPResponse>,
    next: any
) => {
    const session = await getSession({ req });

    // console.log(session);

    if (!session) {
        res.status(401).send({
            ok: false,
            error: "Unauthorized",
        });
        return;
    } else {
        next();
    }
};

export default requireAuth;
