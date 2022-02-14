import Logger from "@libs/utils/Logger";
import { firebaseAdminAuth } from "@services/firebase/firebaseAdmin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { NextApiRequest, NextApiResponse } from "next";

const checkAuthenticated = async (
    req: NextApiRequest & { uid: string },
    res: NextApiResponse<GenericHTTPResponse<any>>,
    next: any
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ ok: false, data: "No token provided" });

    const token = authHeader.split(" ")[1];

    if (!token)
        return res.status(401).json({ ok: false, data: "No token provided" });

    let decodedToken: DecodedIdToken;
    try {
        decodedToken = await firebaseAdminAuth.verifyIdToken(token);

        // If Decoded Token is undefined or invalid, return 401
        if (!decodedToken || !decodedToken.uid)
            return res.status(401).json({ ok: false, data: "Invalid token" });

        Logger.info(
            "Auth Check Middleware",
            `Decoded Token for: ${decodedToken.email}`
        );
        // If Decoded Token is valid, set req.uid to decodedToken
        req.uid = decodedToken.uid;
        next();
    } catch (error) {
        Logger.error("Auth Check Middleware", error);
        return res.status(401).json({ ok: false, data: error });
    }

    next();
};

export default checkAuthenticated;
