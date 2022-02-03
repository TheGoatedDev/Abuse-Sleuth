import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import logger from "./logger";

const apiHandler = nextConnect<NextApiRequest, NextApiResponse>({
    onError: (err, _req, _res, _next) => {
        logger.error(`API Handler OnError Triggered!!!! Reason: ${err}`);
    },
    onNoMatch: (_req, res, _next) => {
        res.status(405).json({
            ok: false,
            message: "Method Not Implemented",
        });
    },
});

export default apiHandler;
