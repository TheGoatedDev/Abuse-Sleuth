import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    throw new Error("This is a test error");
};

export default withSentry(handler);
