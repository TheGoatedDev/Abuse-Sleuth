import { SupabaseClient } from "@supabase/supabase-js";
import { NextRouter } from "next/router";

export const supabaseSignOut = (supabase: SupabaseClient) => {
    supabase.auth.signOut();
};

export const supabaseSignOutAndReload = (
    supabase: SupabaseClient,
    router: NextRouter
) => {
    supabase.auth.signOut();
    router.reload();
};
