import { prisma } from "@abuse-sleuth/prisma";

import removeReportIfExpired from "@services/database/reports/removeReportIfExpired";
import createHandler from "@utils/helpers/createHandler";
import requireAuth from "@utils/middleware/requireAuth";
import requireValidation from "@utils/middleware/requireValidation";
import { reportQuerySchema } from "@utils/validationSchemas/reportQuerySchema";

const handler = createHandler();

handler.use(requireAuth);
handler.use(requireValidation({ querySchema: reportQuerySchema }));

handler.get(async (req: NextApiRequestWithUser, res) => {
    const user = req.user;

    const reportID: string = req.query.reportID as string;

    if (await removeReportIfExpired(reportID)) {
        return res.status(400).send({
            ok: false,
            error: "Report not found",
        });
    }

    // Get the Raw Report with all links
    const rawReport = await prisma.scanReport.findFirst({
        where: {
            user: {
                id: user.id,
            },

            id: reportID,
        },
        include: {
            ipProfiles: {
                include: {
                    ipProfile: true,
                },
            },
        },
    });

    // Check if the Report is valid
    if (!rawReport) {
        return res.status(400).send({
            ok: false,
            error: "Report not found",
        });
    }

    // Parse Reports
    const report = {
        id: rawReport.id,
        ipProfiles: rawReport.ipProfiles.map((v) => v.ipProfile),
        expiresAt: rawReport.expiresAt,
        createdAt: rawReport.createdAt,
        updatedAt: rawReport.updatedAt,
    };

    //console.log(report);

    res.status(200).send({
        ok: true,
        data: report,
    });
});

export default handler;
