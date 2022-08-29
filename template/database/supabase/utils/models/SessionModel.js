// Session store model to preserve sessions across restarts.
const supabase = require("../supabase");
const table = "session";

const selectSession = async ({ id }) => {
  const { data, error } = await supabase
    .from(table)
    .select()
    .filter("id", "in", `(${id})`);
  return { data, error };
};

const upsertSession = async ({ id, content, shop }) => {
  const { data, error } = await supabase
    .from(table)
    .upsert({ id, content, shop });
  return { data, error };
};

const deleteSession = async ({ id, shop }) => {
  if (id) {
    const { data, error } = await supabase.from(table).delete().match({ id });
    return { data, error };
  }
  if (shop) {
    const { data, error } = await supabase.from(table).delete().match({ shop });
    return { data, error };
  }
};

module.exports = { selectSession, upsertSession, deleteSession };
