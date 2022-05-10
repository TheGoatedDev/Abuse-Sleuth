import createHandler from "@libs/api/handler";

import { prisma } from "@abuse-sleuth/prisma";

import requireAuth from "@utils/middleware/requireAuth";

const handler = createHandler();

handler.use(requireAuth);

handler.get(async (req: NextApiRequestWithUser, res) => {
    const user = req.user;

    // Get All Reports from user
    const reports = await prisma.scanReport.findMany({
        where: {
            user: {
                id: user.id,
            },
        },
    });

    // console.log(reports);

    res.status(200).send({
        ok: true,
        data: reports,
    });
});

export default handler;
