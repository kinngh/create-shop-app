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

  logger.info("Useful links:");
  logger.info("https://createshopapp.com");
  logger.info("https://github.com/kinngh/create-shop-app");

  const {
    projectName,
    language,
    architecture,
    routing,
    eslint,
    fetch,
    database,
    webhooks,
    billing,
  } = await runCli();

  const [scopedAppName, appDir] = parseNameAndPath(projectName);

  const projectDir = await createProject({
    projectName,
    language,
    architecture,
    routing,
    eslint,
    fetch,
    database,
    webhooks,
    billing,
  });

  if (git) {
    await gitCreate(projectDir);
  }

  nextSteps({ projectName: appDir });
  const packageJson = await fs.readJson(path.join(projectDir, "package.json"));
  packageJson.name = scopedAppName;
  packageJson.createShopApp = { version: getVersion() };

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
      "Unknown error occured. Please open an issue on GitHub with below:\n",
      err
    );
    logger.info("https://github.com/kinngh/create-shop-app/issues/new");
  }
  process.exit(1);
});
