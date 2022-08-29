import path from "path";
import fs from "fs-extra";
import constants from "../constants.js";
const { packageRoot } = constants;

const addDatabase = async ({ projectDir, databaseTech }) => {
  //    "mongodb"
  //    "prisma"
  //    "supabase"
  //    "postgre"

  //MARK:- Create template in the db file in the exact format as the original app, so it'll overwrite the base app with db files
  const dbFileSrc = path.join(packageRoot, `template/database/${databaseTech}`);

  await fs.copy(dbFileSrc, projectDir);
};

export { addDatabase };
