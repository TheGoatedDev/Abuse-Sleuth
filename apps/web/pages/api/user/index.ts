import createHandler from "@utils/helpers/createHandler";
import requireAuth from "@utils/middleware/requireAuth";

const handler = createHandler();

handler.use(requireAuth);

handler.get(async (req: NextApiRequestWithUser, res) => {
    const user = req.user;

    return res.status(200).send({
        ok: true,
        data: user,
    });
});

export default handler;
