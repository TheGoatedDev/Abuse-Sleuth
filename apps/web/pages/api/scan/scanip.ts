import geoip from "geoip-lite";
import { isPrivate, isV4Format, isV6Format } from "ip";
import { getSession } from "next-auth/react";

import { prisma } from "@abuse-sleuth/prisma";

import getHandler from "@libs/api/handler";
import requireAuth from "@libs/api/middleware/requireAuth";

type IRequestBody = {
    ipAddress: string;
};

const handler = getHandler();

handler.use(requireAuth);

handler.post(async (req, res) => {
    const { ipAddress }: IRequestBody = req.body;

    // TODO: Make a better validation with middleware.

    if (!ipAddress) {
        res.status(422).send({
            ok: false,
            error: "IP Address is required.",
        });
        return;
    }

    const isValid = isV4Format(ipAddress) || isV6Format(ipAddress);
    if (!isValid) {
        res.status(422).send({
            ok: false,
            error: "IP Address is Invalid.",
        });
        return;
    }

    const isPrivateAddress = isPrivate(ipAddress);

    let ipProfile = await prisma.iPProfile.findUnique({
        where: {
            ipAddress,
        },
    });

    if (!ipProfile) {
        const geo = geoip.lookup(ipAddress);
        const version = isV4Format(ipAddress) ? "4" : "6";
        ipProfile = await prisma.iPProfile.create({
            data: {
                ipAddress,
                version: version,
                ipProfileDetails: {
                    create: {
                        countryCode: geo?.country ?? "Unknown",
                        privateAddress: isPrivateAddress,
                    },
                },
            },
        });
    }

    res.status(200).send({
        ok: true,
        data: ipProfile.id,
    });
});

export default handler;
