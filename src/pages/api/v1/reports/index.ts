import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "@libs/utils/apiHandler";

const handler = apiHandler.get(
    async (_req: NextApiRequest, _res: NextApiResponse) => {}
);

export default handler;
