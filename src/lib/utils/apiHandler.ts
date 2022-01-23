import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const apiHandler = nextConnect<NextApiRequest, NextApiResponse>({
    onError: (_err, _req, _res, _next) => {},
    onNoMatch: (_req, res, _next) => {
        res.status(405).json({
            ok: false,
            message: "Method Not Implemented",
        });
    },
});

export default apiHandler;
