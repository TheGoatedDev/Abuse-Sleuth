import { NextFunction, Request, Response } from "express";
import { ASRequest } from "types/custom";

import { getSession } from "@abuse-sleuth/auth";

export const requireAuth = async (
    req: ASRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        // Getting the Token from Cookies
        const token = req.cookies.token;

        // Checking Stytch for Token and returns User
        const user = await getSession(token.toString());

        // Make Request contain user for further use
        req.user = user || undefined;

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
