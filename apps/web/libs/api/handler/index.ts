import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const onError = (
    err: any,
    req: NextApiRequest,
    res: NextApiResponse<any>,
    next: NextApiHandler
) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
};

const onNoMatch = (req: NextApiRequest, res: NextApiResponse<any>) => {
    console.log("OOF");
    res.status(404).send({
        message: "Not Found",
    });
};

export const getHandler = () => {
    return nc<NextApiRequest, NextApiResponse<GenericHTTPResponse>>({
        onError,
        onNoMatch,
    });
};

export default getHandler;
