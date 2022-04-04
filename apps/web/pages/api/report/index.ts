import { NextApiRequestWithUser } from "types/http";

import { prisma } from "@abuse-sleuth/prisma";

import getHandler from "@libs/api/handler";
import requireAuth from "@libs/api/middleware/requireAuth";
import requireValidation from "@libs/api/middleware/requireValidation";
import { reportQuerySchema } from "@libs/validationSchemas/reportQuerySchema";

const handler = getHandler();

handler.use(requireAuth);
handler.use(requireValidation({ querySchema: reportQuerySchema }));

handler.get(async (req: NextApiRequestWithUser, res) => {
    const user = req.user;

    const reportID: string = req.query.reportID as string;

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
                    ipProfile: {
                        include: {
                            ipProfileDetails: true,
                        },
                    },
                },
            },
        },
    });

    if (!rawReport) {
        return res.status(400).send({
            ok: false,
            error: "Report either not found or you don't have access to it.",
        });
    }

    const report = {
        id: rawReport.id,
        ipProfiles: rawReport.ipProfiles.map((ipProfile) => {
            return {
                ...ipProfile.ipProfile,
                countryCode: ipProfile.ipProfile.ipProfileDetails.countryCode,
                privateAddress:
                    ipProfile.ipProfile.ipProfileDetails.privateAddress,
            };
        }),
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
