import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { log } from "@lib/utils/log";

const apiHandler = nextConnect<NextApiRequest, NextApiResponse>({
    onError: (err, _req, _res, _next) => {
        log.error(`API Handler OnError Triggered!!!! Reason: ${err}`);
    },
    onNoMatch: (_req, res, _next) => {
        res.status(405).json({
            ok: false,
            message: "Method Not Implemented",
        });
    },
});

export default apiHandler;
