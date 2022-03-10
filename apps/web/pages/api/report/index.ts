import { getSession } from "next-auth/react";

import getHandler from "@libs/api/handler";
import requireAuth from "@libs/api/middleware/requireAuth";
import prisma from "@libs/prisma";

const handler = getHandler();

handler.use(requireAuth);

handler.get(async (req, res) => {
    const session = await getSession({ req });

    const reportID: string = req.query.reportID as string;

    const rawReport = await prisma.scanReport.findFirst({
        where: {
            ownerId: session.user.id,

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
