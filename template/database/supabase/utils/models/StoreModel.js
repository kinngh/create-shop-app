const supabase = require("../supabase");
const table = "active_stores";

const selectStore = async ({ shop, isActive = true }) => {
  const { data, error } = await supabase
    .from(table)
    .select("shop, isActive")
    .filter("shop", "in", `(${shop})`)
    .filter("isActive", "in", `(${isActive})`);
  return { data, error };
};

const upsertStore = async ({ shop, isActive }) => {
  const { data, error } = await supabase.from(table).upsert({ shop, isActive });
  return { data, error };
};

const deleteStore = async ({ shop }) => {
  const { data, error } = await supabase.from(table).delete().match({ shop });
  return { data, error };
};

module.exports = { selectStore, upsertStore, deleteStore };
