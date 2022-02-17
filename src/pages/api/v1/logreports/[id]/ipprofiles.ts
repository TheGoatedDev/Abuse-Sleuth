import runMiddleware from "@libs/helpers/runMiddleware";
import checkAuthenticated from "@libs/middlewares/checkAuthenticated";
import checkMethod from "@libs/middlewares/checkMethod";
import { NextApiRequest, NextApiResponse } from "next";
import Logger from "@libs/utils/Logger";
import getLogReportByID from "@services/firestore/queries/logReport/getLogReportByID";
import joiValidation from "@libs/middlewares/joiValidation";
import Joi from "joi";
import getIPProfileByLogReport from "@services/firestore/queries/ipProfiles/getIPProfilesByLogReport";

const querySchema = Joi.object({
    id: Joi.number().required(),
});

const handler = async (
    req: NextApiRequest & { uid: string },
    res: NextApiResponse<GenericHTTPResponse>
) => {
    await runMiddleware(req, res, checkMethod(["GET"]));
    await runMiddleware(req, res, checkAuthenticated);
    await runMiddleware(req, res, joiValidation({ query: querySchema }));

    Logger.info(
        "API /v1/logreports/[id]",
        `Getting Log Report #${req.query.id} IPProfiles  for ${req.uid}`
    );

    let logReport: any | null;
    try {
        logReport = await getLogReportByID(Number(req.query.id));
        if (logReport?.owner !== req.uid) {
            Logger.error(
                "API /v1/logreports/[id]",
                `User ${req.uid} does not own Log Report ${req.query.id}`
            );
            return res.status(403).json({
                ok: false,
                data: "User does not own Log Report",
            });
        }
    } catch (error) {
        Logger.error(
            "API /v1/logreports/[id]",
            `Error getting Log Report for ${req.uid}: `,
            error
        );
        throw error;
    }

    let ipProfiles;
    try {
        ipProfiles = await getIPProfileByLogReport(logReport);
        Logger.info(
            "API /v1/logreports/[id]",
            `Got IP Profiles for Log Report #${req.query.id} for ${req.uid}`
        );
    } catch (error) {
        Logger.error(
            "API /v1/logreports/[id]",
            `Error getting IP Profiles for Log Report #${req.query.id} for ${req.uid}: `,
            error
        );
        throw error;
    }

    res.status(200).json({ ok: true, data: ipProfiles });
};

export default handler;
