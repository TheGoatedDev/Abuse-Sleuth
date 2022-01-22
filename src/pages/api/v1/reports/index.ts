import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "../../../../lib/utils/apiHandler";

const handler = apiHandler.get(
    async (req: NextApiRequest, res: NextApiResponse) => {}
);

export default handler;
