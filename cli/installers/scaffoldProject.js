//MARK:- This is not really necessary since this can be handled directly in `installers/<thing>.js` and `installers/createProject.js`
//Dependants: ./installers/createProject.js

import chalk from "chalk";
import fs from "fs-extra";
import inquirer from "inquirer";
import ora from "ora";
import path from "path";
import constants from "../constants.js";
import logger from "../utils/logger.js";
import execCommand from "../utils/execCommand.js";

const { packageRoot } = constants;

const scaffoldProject = async ({
  projectName,
    language,
    architecture,
    routing,
    eslint,
    fetch,
    database,
    webhooks,
    billing,
    packageManager,
    projectDir
}) => {
  console.log("Debug: scaffoldProject");

  const srcDir = path.join(packageRoot, "template/base");
  logger.info(
    `\nUsing: ${chalk.cyan.bold(packageManager)} to install packages.\n`
  );

  const spinner = ora(`Installing packages...\n`).start();

  //If the dir exists and is empty, add anyways. If there's content, ask to overwrite

  if (fs.existsSync(projectDir)) {
    if (fs.readdir(projectDir).length === 0) {
      spinner.info(
        `${chalk.cyan.bold(
          projectName
        )} exists but is empty. Continuing anyways.\n`
      );
    } else {
      spinner.stopAndPersist();
      const { overwriteDir } = await inquirer.prompt({
        name: "overwriteDir",
        type: "confirm",
        message: `${chalk.redBright.bold("Warning:")} ${chalk.cyan.bold(
          projectName
        )} already exists and isn't empty. Do you want to overwrite it?`,
        default: false,
      });

      if (!overwriteDir) {
        spinner.fail("Aborting installation.");
        process.exit(0);
      } else {
        spinner.info(
          `Cleaning contents of ${chalk.cyan.bold(
            projectName
          )} and creating app.\n`
        );
        fs.emptydirSync(projectDir);
      }
    }
  }

  spinner.start();

  await fs.copy(srcDir, projectDir);

  //Install packages
  await execCommand(`${packageManager} install --force`, { cwd: projectDir });

  logger.success("Successfully installed base packages.");

  let dbPackage = "";
  let additionalInstalls = [];

  switch (databaseTech) {
    case "mongodb":
      dbPackage = "mongoose";
      break;
    case "prisma":
      dbPackage = "prisma -D";
      additionalInstalls = ["npm install @prisma/client --force"];
      break;
    case "supabase":
      dbPackage = "@supabase/supabase-js";
      break;
    case "postgre":
      dbPackage = "pg";
      break;
  }

  if (dbPackage !== "") {
    await execCommand(`${packageManager} install ${dbPackage} --force`, {
      cwd: projectDir,
    });
  }

  if (additionalInstalls.length > 0) {
    additionalInstalls.forEach(async function (installCommand) {
      await execCommand(installCommand, { cwd: projectDir });
    });
  }

  spinner.succeed(`Successfully installed ${databaseTech}`);

  let gqlPackage = "";
  switch (graphqlTech) {
    case "apollo_client":
      gqlPackage = "@apollo/client";
      break;
    case "react_query":
      gqlPackage = "react-query";
      break;
  }

  if (gqlPackage !== "") {
    await execCommand(`${packageManager} install ${gqlPackage} --force`, {
      cwd: projectDir,
    });
  }

  spinner.succeed(`Successfully installed ${gqlPackage}`);

  await fs.rename(
    path.join(projectDir, "_gitignore"),
    path.join(projectDir, ".gitignore")
  );
  await fs.rename(
    path.join(projectDir, "_prettierignore"),
    path.join(projectDir, ".prettierignore")
  );
  await fs.rename(
    path.join(projectDir, "_prettierrc"),
    path.join(projectDir, ".prettierrc")
  );
  await fs.rename(
    path.join(projectDir, "_env.example"),
    path.join(projectDir, ".env.example")
  );
  await fs.copy(
    path.join(projectDir, ".env.example"),
    path.join(projectDir, ".env")
  );

  if (databaseTech === "prisma") {
    const packageJson = await fs.readJson(
      path.join(projectDir, "package.json")
    );
    packageJson.scripts = {
      ...packageJson.scripts,
      "postgre:create": "mkdir postgre && pg_ctl -D postgre init",
      "postgre:start": "pg_ctl -D postgre start",
      "postgre:stop": "pg_ctl -D postgre stop",
      "prisma:create": "npx prisma db push",
      "prepare": "npx prisma generate",
    };

    await fs.writeJson(path.join(projectDir, "package.json"), packageJson, {
      spaces: 2,
    });
  }

  spinner.succeed(`${chalk.cyan.bold(projectName)} created successfully!\n`);
};

export default scaffoldProject;
