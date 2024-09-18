import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_ANON_KEY!
);
