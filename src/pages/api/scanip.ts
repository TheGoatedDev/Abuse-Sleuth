import runMiddleware from "@libs/helpers/runMiddleware";
import checkAuthenticated from "@libs/middlewares/checkAuthenticated";
import checkMethod from "@libs/middlewares/checkMethod";
import { makeAIPDBAPIRequest } from "@libs/providers/AbuseIPDB/abuseIPDBProvider";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";
import { ipRegex } from "@libs/utils/regexTest";
import joiValidation from "@libs/middlewares/joiValidation";
import generateMockData from "@libs/providers/AbuseIPDB/generateMockData";
import createIPProfile from "@services/firestore/queries/ipProfiles/createIPProfile";
import Logger from "@libs/utils/Logger";
import getIPProfileByIP from "@services/firestore/queries/ipProfiles/getIPProfileByIP";
import { IPProfile } from "@prisma/client";
import createAIPDBScanResult from "@services/firestore/queries/aipdbScanResults/createAIPDBScanResult";

const bodyScheme = Joi.object({
    ipAddress: Joi.string().regex(ipRegex).required(),
});

const handler = async (
    req: NextApiRequest & { uid: string },
    res: NextApiResponse<GenericHTTPResponse>
) => {
    await runMiddleware(req, res, checkMethod(["POST"]));
    await runMiddleware(req, res, checkAuthenticated);
    await runMiddleware(req, res, joiValidation({ body: bodyScheme }));

    // Get the IP address from the request body
    const { ipAddress } = req.body;

    Logger.info(
        "API Scan IP Endpoint",
        `Performing a IP Scan for ${ipAddress}`
    );

    // Get a IP Profile
    let ipProfile: IPProfile | null;
    try {
        ipProfile = await createIPProfile(ipAddress, req.uid);
        Logger.info(
            "API Scan IP Endpoint",
            `Created IPProfile for ${ipAddress}`
        );
    } catch (error) {
        ipProfile = await getIPProfileByIP(ipAddress);
        Logger.info("API Scan IP Endpoint", `Got IPProfile for ${ipAddress}`);
    }

    if (ipProfile === null) {
        Logger.error(
            "API Scan IP Endpoint",
            `IPProfile for ${ipAddress} was null`
        );
        return res.status(500).json({
            ok: false,
            data: "IP Profile was null",
        });
    }

    // Make the API request if in production else use the mock data
    let data;
    if (process.env.NODE_ENV === "production") {
        data = await makeAIPDBAPIRequest(ipAddress);
    } else {
        data = generateMockData();
    }

    // Added the Data to the AIPDB Scan Results in the the database
    try {
        await createAIPDBScanResult(data, ipProfile);
        Logger.info(
            "API Scan IP Endpoint",
            `Created AIPDB Scan Result for ${ipAddress}`
        );
    } catch (error) {
        Logger.info(
            "API Scan IP Endpoint",
            `Got AIPDB Scan Result for ${ipAddress}`
        );
    }

    res.status(200).json({ ok: true, data: ipProfile });
};

export default handler;
