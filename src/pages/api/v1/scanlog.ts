import Joi from "joi";
import joiValidation from "@libs/middlewares/joiValidation";
import apiHandler from "@libs/utils/apiHandler";
import { isIPAddress } from "@libs/utils/regexTest";

const queryScheme = Joi.object({
    ipAddresses: Joi.string().required(),
    generateReport: Joi.bool().required(),
});

const handler = apiHandler.post(
    joiValidation({ body: queryScheme }),
    async (req, res) => {
        // Take the Array of IP Addresses and Scan them all and add them to the database and generate a report.
        const allEntriesFromBody: string[] = req.body.ipAddresses.split(",");

        // Add All Valid IPs to a array
        const allValidIPs: string[] = [];
        allEntriesFromBody.forEach((element: string) => {
            if (isIPAddress(element)) {
                allValidIPs.push(element);
            }
        });

        //TODO: Add all valid IPs to the database and generate a report.

        // Return the Report ID
        return res.status(200).json({
            ok: true,
            data: "TODO",
        });
    }
);

export default handler;
