import runMiddleware from "@libs/helpers/runMiddleware";
import checkAuthenticated from "@libs/middlewares/checkAuthenticated";
import checkMethod from "@libs/middlewares/checkMethod";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";
import { ipRegex } from "@libs/utils/regexTest";
import joiValidation from "@libs/middlewares/joiValidation";
import Logger from "@libs/utils/Logger";
import createOrGetIPProfile from "@services/firestore/queries/ipProfiles/createOrGetIPProfile";
import sanatiseIPProfile from "@services/firestore/queries/ipProfiles/sanatiseIPProfile";
import createOrGetLogReport from "@services/firestore/queries/logReports/createOrGetLogReport";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import sanatiseLogReport from "@services/firestore/queries/logReports/sanatiseLogReport";
import createLogReportItem from "@services/firestore/queries/logReportItems/createLogReportItem";

const bodyScheme = Joi.object({
    ipAddresses: Joi.array()
        .items(Joi.string().regex(ipRegex).required())
        .required(),
});

const handler = async (
    req: NextApiRequest & { user: UserRecord },
    res: NextApiResponse<GenericHTTPResponse>
) => {
    await runMiddleware(req, res, checkMethod(["POST"]));
    await runMiddleware(req, res, checkAuthenticated);
    await runMiddleware(req, res, joiValidation({ body: bodyScheme }));

    // Get the IP address from the request body
    const { ipAddresses } = req.body;

    const ipAddressArray: string[] = ipAddresses;

    Logger.debug("API /scanlog", "Now Generating Log Report");

    //Generated a Report Entry to be added to the database
    let logReport: LogReport;
    try {
        const doc = await createOrGetLogReport(req.user);
        Logger.info(
            "API /scanlog",
            `Created LogReport #${doc.id} for ${req.user.email}`
        );
        logReport = sanatiseLogReport(doc);
    } catch (error) {
        Logger.error("API /scanlog", `Error creating Log Report: ${error}`);
        throw error;
    }

    Logger.debug(
        "API /scanlog",
        "Now Generating IP Profiles for Log Report #",
        logReport.id
    );

    // Attempt to create the IP Profiles
    const ipProfiles: IPProfile[] = [];
    for (const ipAddress of ipAddressArray) {
        // Get a IP Profile
        let ipProfileDoc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>;
        try {
            ipProfileDoc = await createOrGetIPProfile(ipAddress);
            Logger.info("API /scanlog", `Created IPProfile for ${ipAddress}`);

            const ipProfile = sanatiseIPProfile(ipProfileDoc);
            if (ipProfile) ipProfiles.push(ipProfile);
        } catch (error) {
            Logger.error("API /scanlog", `Error creating IP Profile: ${error}`);
        }
    }

    Logger.debug("API /scanlog", "Now Generating Log Report Items");

    // Make Log Report Items for all the IP Profiles
    for (const ipProfile of ipProfiles) {
        try {
            await createLogReportItem(logReport, ipProfile);
            Logger.info(
                "API /scanlog",
                `Created Log Report Item for ${ipProfile.ipAddress} to Report #${logReport.id}`
            );
        } catch (error) {
            Logger.error(
                "API /scanlog",
                `Error creating Log Report Item: ${error}`
            );
            throw error;
        }
    }

    res.status(200).json({ ok: true, data: { reportId: logReport.id } });
};

export default handler;
