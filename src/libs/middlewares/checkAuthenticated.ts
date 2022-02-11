import logger from "@libs/utils/logger";
import { firebaseAdminAuth } from "@services/firebase/firebaseAdmin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { NextApiRequest, NextApiResponse } from "next";

const checkAuthenticated = async (
    req: NextApiRequest & { uid: string },
    res: NextApiResponse<GenericHTTPResponse<any>>,
    next: any
) => {
    const authHeader = req.cookies.token;
    if (!authHeader)
        return res
            .status(401)
            .json({ ok: false, data: "No token cookie provided" });

    //logger.info(`Authenticating with ${authHeader}`);

    const token = authHeader.split(" ")[1];

    if (!token)
        return res.status(401).json({ ok: false, data: "No token provided" });

    let decodedToken: DecodedIdToken;
    try {
        decodedToken = await firebaseAdminAuth.verifyIdToken(token);

        // If Decoded Token is undefined or invalid, return 401
        if (!decodedToken || !decodedToken.uid)
            return res.status(401).json({ ok: false, data: "Invalid token" });

        logger.info(`Decoded Token for: ${decodedToken.email}`);
        // If Decoded Token is valid, set req.uid to decodedToken
        req.uid = decodedToken.uid;
        next();
    } catch (error) {
        logger.error(error);
        return res.status(401).json({ ok: false, data: error });
    }

    next();
};

export default checkAuthenticated;
