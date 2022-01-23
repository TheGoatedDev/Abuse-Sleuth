import { AIPDBReport } from "@prisma/client";
import Joi from "joi";
import joiValidation from "../../../lib/middlewares/joiValidation";
import { scanIP } from "../../../lib/utils/aipdbClient";
import apiHandler from "../../../lib/utils/apiHandler";
import { isIPAddress } from "../../../lib/utils/regexTest";

const queryScheme = Joi.object({
    ipAddresses: Joi.string().required(),
    generateReport: Joi.bool().required(),
});

const handler = apiHandler.post(
    joiValidation({ body: queryScheme }),
    async (req, res) => {
        // Take the Array of IP Addresses and Scan them all and add them to the database and generate a report.
        const allEntriesFromBody: string[] = req.body.ipAddresses.split(",");

        const allValidIPs: string[] = [];

        // Add All Valid IPs to a array
        allEntriesFromBody.forEach((element: string) => {
            if (isIPAddress(element)) {
                allValidIPs.push(element);
            }
        });

        // Async Scan All IPs and wait for all the result to come back.
        const allPromises: Promise<AIPDBReport | null>[] = [];
        allValidIPs.forEach((element) => {
            allPromises.push(scanIP(element, false));
        });
        let settled = await Promise.allSettled(allPromises);

        // Check if the Request wants a Report Generated and generated the report.
        if (req.body.generateReport === true) {
            // Filter out all results that were Rejected
            settled = settled.filter((x) => x != null);

            // Generated the prisma create array from all the results that were resolved.
            const createRecords: { aipdbReportId: number }[] = [];
            settled.forEach((element: any) => {
                const aipdb: AIPDBReport = element.value;
                createRecords.push({ aipdbReportId: aipdb.id });
            });

            // Create the Report with all the ReportLinks
            const report = await prisma.report.create({
                data: {
                    reportLinks: {
                        create: [...createRecords],
                    },
                },
                include: {
                    reportLinks: {
                        include: {
                            aipdbReport: true,
                        },
                    },
                },
            });

            // Return the Report ID
            return res.status(200).json({
                ok: true,
                data: report.id,
            });
        } else {
            // Return No Report ID as Request didn't want a report.
            return res.status(200).json({
                ok: true,
                data: -1,
            });
        }
    }
);

export default handler;
