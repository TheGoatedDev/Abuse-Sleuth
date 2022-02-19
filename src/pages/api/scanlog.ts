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
    // const logReportItems: LogReportItem[] = [];
    // for (const ipProfile of ipProfiles) {
    //     let logReportItem: LogReportItem;
    //     try {
    //         logReportItem = await createLogReportItem(logReport, ipProfile);
    //         Logger.info(
    //             "API /scanlog",
    //             `Created Log Report Item for ${ipProfile.ipAddress} to Report #${logReport.id}`
    //         );
    //     } catch (error) {
    //         Logger.error(
    //             "API /scanlog",
    //             `Error creating Log Report Item: ${error}`
    //         );
    //         throw error;
    //     }

    //     logReportItems.push(logReportItem);
    // }

    // Make the API request if in production else use the mock data
    // let data;
    // if (process.env.NODE_ENV === "production") {
    //     data = await makeAIPDBAPIRequest(ipAddress);
    // } else {
    //     data = generateMockData();
    // }

    // Added the Data to the AIPDB Scan Results in the the database
    // try {
    //     await createAIPDBScanResult(data, ipProfile);
    //     logger.info(`Created AIPDB Scan Result for ${ipAddress}`);
    // } catch (error) {
    //     logger.info(`Got AIPDB Scan Result for ${ipAddress}`);
    // }

    res.status(200).json({ ok: true, data: { reportId: ipProfiles.length } });
};

export default handler;
