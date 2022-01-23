import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "../../../../lib/utils/apiHandler";

const handler = apiHandler.get(
    async (_: NextApiRequest, _: NextApiResponse) => {}
);

export default handler;
