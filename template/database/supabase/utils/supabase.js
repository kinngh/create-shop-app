const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.DB_URL;
const supabaseKey = process.env.DB_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
