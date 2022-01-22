import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const apiHandler = nextConnect<NextApiRequest, NextApiResponse>({
    onError: (err, req, res, next) => {},
    onNoMatch: (req, res, next) => {
        res.status(405).json({
            ok: false,
            message: "Method Not Implemented",
        });
    },
});

export default apiHandler;
