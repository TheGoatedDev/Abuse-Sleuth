import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import joiValidation from "../../../../lib/middlewares/joiValidation";
import prisma from "../../../../lib/prisma";

const queryScheme = Joi.object({
    ip: Joi.string()
        .required()
        .regex(/^(?:[0-9]{1,3}.){3}[0-9]{1,3}$/)
        .message("Query Value was not a valid IP Address"),
});

const handler = nextConnect().get(
    joiValidation({ query: queryScheme }),
    async (req: NextApiRequest, res: NextApiResponse) => {
        const { ip } = req.query;

        //console.log(ip);

        const report = await prisma.aIPDBReport.findUnique({
            where: {
                ipAddress: ip as string,
            },
        });
        //console.log(report);

        res.status(200).json({ ok: report !== null, data: report });
    }
);

export default handler;
