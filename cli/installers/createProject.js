/*
  First install all dependencies then start copiyng files from respective templates to the projectDir
*/

//MARK:- Explore making language, projectDir as constants so we don't have to pass it every single time

import path from "path";
import appArchitecture from "./architecture.js";
import appBilling from "./billing.js";
import appDatabase from "./database.js";
import appESLint from "./eslint.js";
import appFetch from "./fetch.js";
import appRedis from "./redis.js";
import appRouting from "./routing.js";
import scaffoldProject from "./scaffoldProject.js";
import appWebhooks from "./webhooks.js";

const createProject = async ({
  projectName,
  language,
  architecture,
  routing,
  eslint,
  appFetch,
  database,
  webhooks,
  billing,
}) => {
  console.log("Debug: createProject");
  const packageManager = "npm";
  const projectDir = path.resolve(process.cwd(), projectName);
  //check if folder exists

  //MARK:- [TODO] Remove scaffoldProject and handle in specific tech itself
  await scaffoldProject({
    projectName,
    language,
    architecture,
    routing,
    eslint,
    appFetch,
    database,
    webhooks,
    billing,
    packageManager,
    projectDir,
  });

  //MARK:- Old strats, delete once done with this
  // await addDatabase({ projectDir, databaseTech });
  // await addGraphqlClient({ projectDir, graphqlTech });

  //MARK:- Run these functions in the order of setup. Since we're only copy/pasting code from one file to another, running in the wrong order *will* create errors
  await appArchitecture({ projectDir, architecture, language });
  //MARK:- Billing setup will wildly depend on what db is being chosen
  // This can also be converted to a utility
  await appBilling({ projectDir, billing, language });
  await appDatabase({ projectDir, database, language });
  if (redis) {
    //Redis will overwrite server/utils/sessionStorage.js from database to use Redis
    await appRedis({ projectDir, redis, language });
  }
  await appFetch({ projectDir, appFetch, language });
  if (routing !== "next") {
    //If we're using Next.js, using a custom router doesn't make sense.
    await appRouting({ projectDir, routing, language });
  }
  if (webhooks !== "none") {
    //If we're natively handling webhooks, no need to replace current one
    await appWebhooks({ projectDir, webhooks, language });
  }
  if (eslint) {
    //Run only if using ESLint
    await appESLint({ projectDir, eslint });
  }

  //rename `_filename` to `.filename` in projectDir

  return projectDir;
};

export default createProject;
