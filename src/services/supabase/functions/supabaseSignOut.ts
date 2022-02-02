import { SupabaseClient } from "@supabase/supabase-js";

export const supabaseSignOut = (supabase: SupabaseClient) => {
    supabase.auth.signOut();
};
