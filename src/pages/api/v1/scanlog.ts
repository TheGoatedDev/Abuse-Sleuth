import { AIPDB_Report } from "@prisma/client";
import Joi from "joi";
import joiValidation from "../../../lib/middlewares/joiValidation";
import { scanIP } from "../../../lib/utils/aipdbClient";
import apiHandler from "../../../lib/utils/apiHandler";

const queryScheme = Joi.object({
    ipAddresses: Joi.string().required(),
    ignoreCache: Joi.bool().required(),
});

const handler = apiHandler.post(
    joiValidation({ body: queryScheme }),
    async (req, res) => {
        // Take the Array of IP Addresses and Scan them all and add them to the database and generate a report.
        const allEntriesFromBody = req.body.ipAddresses
            .replaceAll("\n", "")
            .split(",");

        const allIPAddresses: string[] = [];

        allEntriesFromBody.forEach((element: string) => {
            allIPAddresses.push(element.split(" ")[0]);
        });

        const allUniqueIPAddresses = [...new Set<string>(allIPAddresses)];

        console.log(allUniqueIPAddresses);

        const allPromises: Promise<AIPDB_Report | null>[] = [];

        allUniqueIPAddresses.forEach((element) => {
            allPromises.push(scanIP(element, req.body.ignoreCache));
        });

        await Promise.allSettled(allPromises);

        console.log("Done Log Scan");

        res.status(200).json({
            ok: true,
            message: "Done Scan",
            data: {
                scanAmount: allPromises.length,
            },
        });
    }
);

export default handler;
