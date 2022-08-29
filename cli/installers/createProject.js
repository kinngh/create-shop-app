import path from "path";
import scaffoldProject from "./scaffoldProject.js";
import { addDatabase } from "./databaseTech.js";
import { addGraphqlClient } from "./graphqlTech.js";

import getPackageManager from "../utils/getPackageManager.js";

const createProject = async ({ projectName, databaseTech, graphqlTech }) => {
  const packageManager = getPackageManager();
  const projectDir = path.resolve(process.cwd(), projectName);

  await scaffoldProject({
    projectName,
    projectDir,
    packageManager,
    databaseTech,
    graphqlTech,
  });

  await addDatabase({ projectDir, databaseTech });
  await addGraphqlClient({ projectDir, graphqlTech });

  return projectDir;
};

export default createProject;
