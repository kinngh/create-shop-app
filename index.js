#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import gitCreate from "./cli/helpers/gitCreate.js";
import nextSteps from "./cli/helpers/nextSteps.js";
import runCli from "./cli/index.js";
import createProject from "./cli/installers/createProject.js";
import getVersion from "./cli/utils/getCLIVersion.js";
import logger from "./cli/utils/logger.js";
import parseNameAndPath from "./cli/utils/parseNameAndPath.js";
import renderTitle from "./cli/utils/renderTitle.js";

const main = async () => {
  renderTitle();

  const {
    appName,
    databaseTech,
    graphqlTech,
    // billingAPI,
    flags: { git, install },
  } = await runCli();
  console.log("Done runcli");

  const [scopedAppName, appDir] = parseNameAndPath(appName);

  const projectDir = await createProject({
    projectName: appDir,
    databaseTech,
    graphqlTech,
  });
  console.log("Done createProject");

  if (git) {
    await gitCreate(projectDir);
    console.log("Done create git");
  }

  nextSteps({ projectName: appDir, database: databaseTech, install });
  console.log("Done nextsteps");
  const packageJson = await fs.readJson(path.join(projectDir, "package.json"));
  packageJson.name = scopedAppName;
  packageJson.csaMetadata = { initVersion: getVersion() };

  await fs.writeJson(path.join(projectDir, "package.json"), packageJson, {
    spaces: 2,
  });

  process.exit(0);
};

main().catch((err) => {
  logger.error("Aborting Installation");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      "Unknown error occured. Please open an issue on GitHub with below:\n"
    );
    console.log(err);
  }
  process.exit(1);
});
