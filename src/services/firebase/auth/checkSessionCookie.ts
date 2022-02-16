import Logger from "@libs/utils/Logger";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { firebaseAdminAuth } from "../firebaseAdmin";

export const checkSessionCookie = async (cookie: string) => {
    let decodedToken: DecodedIdToken;

    try {
        decodedToken = await firebaseAdminAuth.verifySessionCookie(
            cookie,
            true
        );

        // If Decoded Token is undefined or invalid, return 401
        if (!decodedToken || !decodedToken.uid) return null;

        // If Decoded Token is valid, set req.uid to decodedToken
        return decodedToken;
    } catch (error) {
        Logger.error("GET /api/auth", error);
        return null;
    }
};
