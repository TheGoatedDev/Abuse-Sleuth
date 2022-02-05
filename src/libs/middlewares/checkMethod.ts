import { NextApiRequest, NextApiResponse } from "next";

const checkMethod = (allowedMethods: RequestMethod[]) => {
    return (
        req: NextApiRequest,
        res: NextApiResponse<GenericHTTPResponse>,
        next: any
    ) => {
        //logger.info(req.method);
        if (!allowedMethods.includes(req.method as RequestMethod))
            return res
                .status(405)
                .json({ ok: false, data: "Method not allowed" });

        next();
    };
};

export default checkMethod;
