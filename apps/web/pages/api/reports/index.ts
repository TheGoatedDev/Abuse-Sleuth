import { prisma } from "@abuse-sleuth/prisma";

import removeAllExpiredReportsByUser from "@services/database/reports/removeAllExpiredReportsByUser";
import createHandler from "@utils/helpers/createHandler";
import requireAuth from "@utils/middleware/requireAuth";

const handler = createHandler();

handler.use(requireAuth);

handler.get(async (req: NextApiRequestWithUser, res) => {
    const user = req.user;

    await removeAllExpiredReportsByUser(user.id);

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
