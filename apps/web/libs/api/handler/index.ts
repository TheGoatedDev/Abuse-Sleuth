import * as Sentry from "@sentry/node";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import nc from "next-connect";

const onError = async (
    err: any,
    req: NextApiRequest,
    res: NextApiResponse<any>,
    next: NextApiHandler
) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const session = await getSession({ req });
    Sentry.setUser(
        session.user
            ? {
                  id: session.user.id,
                  email: session.user.email,
                  ip_address: "{{auto}}",
              }
            : null
    );
    Sentry.captureException(err);
    return res.status(500).end("Something broke!");
};

const onNoMatch = (req: NextApiRequest, res: NextApiResponse<any>) => {
    //console.log("OOF");
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
