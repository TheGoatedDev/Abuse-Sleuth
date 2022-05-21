import geoip from "geoip-lite";
import { isPrivate, isV4Format, isV6Format } from "ip";

import { prisma } from "@abuse-sleuth/prisma";

import createHandler from "@utils/helpers/createHandler";
import requireAuth from "@utils/middleware/requireAuth";
import requireValidation from "@utils/middleware/requireValidation";
import { scanSingleIPSchema } from "@utils/validationSchemas/scanSingleIPSchema";

type IRequestBody = {
    ipAddress: string;
};

const handler = createHandler();

handler.use(requireAuth);
handler.use(requireValidation({ bodySchema: scanSingleIPSchema }));

handler.post(async (req, res) => {
    const { ipAddress }: IRequestBody = req.body;

    // Try to get IP Profile
    let ipProfile = await prisma.iPProfile.findUnique({
        where: {
            ipAddress,
        },
    });

    // If IP Profile doesnt exist create one
    if (!ipProfile) {
        const geo = geoip.lookup(ipAddress);
        const version = isV4Format(ipAddress) ? "4" : "6";
        const isPrivateAddress = isPrivate(ipAddress);
        ipProfile = await prisma.iPProfile.create({
            data: {
                ipAddress,
                version: version,
                countryCode: geo?.country ?? "Unknown",
                privateAddress: isPrivateAddress,
            },
        });
    }

    res.status(200).send({
        ok: true,
        data: ipProfile.id,
    });
});

export default handler;
