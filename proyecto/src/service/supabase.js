//mi archivo de conexion

import {createClient} from "@supabase/supabase-js"

const SUPABASE_URL ="https://lcadttyfglukwgeingga.supabase.co";
const SUPABASE_KEY="sb_publishable_AkTBuS6-aDZW936OuIM3NA_UAMpUqJj";

export const supabase= createClient(SUPABASE_URL, SUPABASE_KEY);