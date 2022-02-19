import runMiddleware from "@libs/helpers/runMiddleware";
import checkMethod from "@libs/middlewares/checkMethod";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";
import joiValidation from "@libs/middlewares/joiValidation";
import { firebaseAdminAuth } from "@services/firebase/firebaseAdmin";
import { setCookie, destroyCookie } from "nookies";
import Logger from "@libs/utils/Logger";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

const bodyScheme = Joi.object({
    token: Joi.string().required(),
});

const postHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<GenericHTTPResponse>
) => {
    await runMiddleware(req, res, joiValidation({ body: bodyScheme }));

    const { token } = req.body;

    Logger.info("POST /api/auth", "Attempting to Create Cookie for:", token);

    const expiresIn = 1000 * 60 * 60 * 24 * 7;

    try {
        const cookie = await firebaseAdminAuth.createSessionCookie(
            token.toString(),
            { expiresIn }
        );
        setCookie({ res }, "token", cookie, {
            httpOnly: true,
            maxAge: expiresIn / 1000,
            path: "/",
        });
        Logger.success(
            "POST /api/auth",
            "Cookie created Successful for:",
            cookie
        );
        return res.end();
    } catch (error) {
        Logger.error("POST /api/auth", error);
        return res.status(400).json({
            ok: false,
            data: "Unauthorized token",
        });
    }
};

const getHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<GenericHTTPResponse<UserRecord | string>>
) => {
    const token = req.cookies.token;

    if (!token)
        return res.status(401).json({ ok: false, data: "No token provided" });

    let decodedToken: DecodedIdToken;

    try {
        decodedToken = await firebaseAdminAuth.verifySessionCookie(token, true);

        // If Decoded Token is undefined or invalid, return 401
        if (!decodedToken || !decodedToken.uid) {
            Logger.warn("GET /api/auth", "Invalid Token");
            destroyCookie({ res }, "token", { path: "/" });
            return res.status(401).json({ ok: false, data: "Invalid token" });
        }

        Logger.success(
            "GET /api/auth",
            `Sending Decoded Token for: ${decodedToken.email}`
        );
        // If Decoded Token is valid, set req.uid to decodedToken

        res.status(200).json({
            ok: true,
            data: await firebaseAdminAuth.getUser(decodedToken.uid),
        });
    } catch (error: any) {
        destroyCookie({ res }, "token", { path: "/" });
        Logger.error("GET /api/auth", error);
        return res.status(401).json({ ok: false, data: error });
    }
};

const deleteHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<GenericHTTPResponse>
) => {
    Logger.success("DELETE /api/auth", "Deleting Cookie");
    destroyCookie({ res }, "token", { path: "/" });
    return res.status(200).json({ ok: true, data: "Signed Out" });
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<GenericHTTPResponse>
) => {
    await runMiddleware(req, res, checkMethod(["POST", "GET", "DELETE"]));

    if (req.method === "POST") return await postHandler(req, res);
    if (req.method === "GET") return await getHandler(req, res);
    if (req.method === "DELETE") return await deleteHandler(req, res);
};

export default handler;
