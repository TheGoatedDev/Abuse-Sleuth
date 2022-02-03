import { supabaseClient } from "@services/supabase/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

const checkAuthenticated = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: any
) => {
    const { user } = await supabaseClient.auth.api.getUserByCookie(req);

    if (!user) {
        return res.status(401).json({ ok: false, message: "Unauthorized" });
    }

    return next();
};

export default checkAuthenticated;
