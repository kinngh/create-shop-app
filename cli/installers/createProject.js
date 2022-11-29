import path from "path";
import { addDatabase } from "./databaseTech.js";
import { addGraphqlClient } from "./graphqlTech.js";
import scaffoldProject from "./scaffoldProject.js";

const createProject = async ({ projectName, databaseTech, graphqlTech }) => {
  const packageManager = "npm";
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
