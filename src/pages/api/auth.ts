import { supabaseAdmin } from "@services/supabase/supabaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    supabaseAdmin.auth.api.setAuthCookie(req, res);
};

export default handler;
