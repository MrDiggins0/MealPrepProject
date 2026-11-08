import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://ldnmnlitsiqoitbltaaq.supabase.co";
const SUPABASE_KEY = "sb_publishable_dJPihoPlo_bbEJ7GZt73ig_hxorkuZ9";

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);