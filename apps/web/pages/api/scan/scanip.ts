import geoip from "geoip-lite";
import { getSession } from "next-auth/react";

import getHandler from "@libs/api/handler";
import requireAuth from "@libs/api/middleware/requireAuth";
import prisma from "@libs/prisma";

type IRequestBody = {
    ipAddress: string;
};

const handler = getHandler();

handler.use(requireAuth);

handler.post(async (req, res) => {
    const { ipAddress }: IRequestBody = req.body;

    const session = await getSession({ req });

    if (!ipAddress) {
        res.status(422).send({
            ok: false,
            error: "IP Address is required.",
        });
        return;
    }

    let ipProfile = await prisma.iPProfile.findUnique({
        where: {
            ipAddress,
        },
    });

    if (!ipProfile) {
        ipProfile = await prisma.iPProfile.create({
            data: {
                ipAddress,
                countryCode: geoip.lookup(ipAddress)?.country ?? "Unknown",
            },
        });
    }

    res.status(200).send({
        ok: true,
        data: ipProfile.id,
    });
});

export default handler;
