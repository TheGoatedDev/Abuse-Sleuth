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

        allEntriesFromBody.forEach((element: string) => {
            if (isIPAddress(element)) {
                allValidIPs.push(element);
            }
        });

        const allPromises: Promise<AIPDBReport | null>[] = [];

        allValidIPs.forEach((element) => {
            allPromises.push(scanIP(element, false));
        });

        let settled = await Promise.allSettled(allPromises);

        if (req.body.generateReport === true) {
            settled = settled.filter((x) => x != null);

            const createRecords: { aipdbReportId: number }[] = [];

            settled.forEach((element: any) => {
                const aipdb: AIPDBReport = element.value;
                createRecords.push({ aipdbReportId: aipdb.id });
            });

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

            return res.status(200).json({
                ok: true,
                data: report.id,
            });
        } else {
            return res.status(200).json({
                ok: true,
                data: -1,
            });
        }
    }
);

export default handler;
