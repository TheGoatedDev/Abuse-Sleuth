import getHandler from "@libs/api/handler";

const handler = getHandler();

handler.get(async (req, res) => {
    throw new Error("API throw error test");
    res.status(200).json({ ok: true, error: "API throw error test" });
});

export default handler;
