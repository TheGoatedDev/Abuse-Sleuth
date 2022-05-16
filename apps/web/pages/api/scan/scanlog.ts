import geoip from "geoip-lite";
import { isPrivate, isV4Format } from "ip";

import { prisma } from "@abuse-sleuth/prisma";

import createHandler from "@utils/helpers/createHandler";
import requireAuth from "@utils/middleware/requireAuth";
import requireValidation from "@utils/middleware/requireValidation";
import { scanLogSchema } from "@utils/validationSchemas/scanLogSchema";

type IRequestBody = {
    ipAddresses: string[];
};

const handler = createHandler();

handler.use(requireAuth);
handler.use(requireValidation({ bodySchema: scanLogSchema }));

handler.post(async (req: NextApiRequestWithUser, res) => {
    const { ipAddresses }: IRequestBody = req.body;
    const user = req.user;

    const report = await prisma.scanReport.create({
        data: {
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), //TODO: Change to be inline with A Subscription
            user: {
                connect: {
                    id: user.id,
                },
            },
            ipProfiles: {
                create: [
                    ...ipAddresses.map((ipAddress) => {
                        const geo = geoip.lookup(ipAddress);

                        const isPrivateAddress = isPrivate(ipAddress);
                        const version = isV4Format(ipAddress) ? "4" : "6";
                        return {
                            ipProfile: {
                                connectOrCreate: {
                                    create: {
                                        ipAddress: ipAddress,
                                        version: version,
                                        ipProfileDetails: {
                                            create: {
                                                countryCode:
                                                    geo?.country ?? "Unknown",
                                                privateAddress:
                                                    isPrivateAddress,
                                            },
                                        },
                                    },
                                    where: {
                                        ipAddress: ipAddress,
                                    },
                                },
                            },
                        };
                    }),
                ],
            },
        },
    });

    res.status(200).send({
        ok: true,
        data: report.id,
    });
});

export default handler;
