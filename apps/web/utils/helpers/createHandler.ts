import * as Sentry from "@sentry/node";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const onError = async (
    err: any,
    req: NextApiRequest,
    res: NextApiResponse<any>,
    next: NextApiHandler
) => {
    console.error(err);
    Sentry.captureException(err);
    return res.status(500).end("Something broke!");
};

const onNoMatch = (req: NextApiRequest, res: NextApiResponse<any>) => {
    //console.log("OOF");
    res.status(404).send({
        message: "Not Found",
    });
};

export const createHandler = () => {
    return nc<NextApiRequest, NextApiResponse<GenericHTTPResponse>>({
        onError,
        onNoMatch,
    });
};

export default createHandler;
