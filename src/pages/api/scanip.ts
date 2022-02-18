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

const bodyScheme = Joi.object({
    ipAddress: Joi.string().regex(ipRegex).required(),
});

const handler = async (
    req: NextApiRequest & { uid: string },
    res: NextApiResponse<GenericHTTPResponse<IPProfile | string>>
) => {
    await runMiddleware(req, res, checkMethod(["POST"]));
    await runMiddleware(req, res, checkAuthenticated);
    await runMiddleware(req, res, joiValidation({ body: bodyScheme }));

    // Get the IP address from the request body
    const { ipAddress } = req.body;

    Logger.info("API /api/scanip", `Performing a IP Scan for ${ipAddress}`);

    // Create or Get a IP Profile if not exists
    let ipProfileDoc = await createOrGetIPProfile(ipAddress);
    Logger.info(
        "API /api/scanip",
        `Got IPProfile Doc for ${ipAddress}:`,
        ipProfileDoc.data()
    );

    // Parse Document Snapshot
    const ipProfile = sanatiseIPProfile(ipProfileDoc);

    Logger.debug("API /api/scanip", "Returning IP Profile", ipProfile);

    // Make the API request if in production else use the mock data
    // let data;
    // if (process.env.NODE_ENV === "production") {
    //     data = await makeAIPDBAPIRequest(ipAddress);
    // } else {
    //     data = generateMockData();
    // }

    res.status(200).json({
        ok: true,
        data: ipProfile,
    });
};

export default handler;
