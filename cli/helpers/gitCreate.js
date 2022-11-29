/*
  Create a git repository
*/

import ora from "ora";
import execCommand from "../utils/execCommand.js";
import logger from "../utils/logger.js";

const gitCreate = async (projectDir) => {
  // logger.info("Creating a git repository");
  const spinner = ora("creating a new git repository").start();

  try {
    //Start off with a base commit so there's an option to go back to base.
    const createGitRepo =
      'git init && git add . && git commit -m "Initial commit" && git branch -M main';
    await execCommand(createGitRepo, { cwd: projectDir });
    spinner.succeed(logger.success("Successfully Initialized Repository"));
  } catch (e) {
    logger.error("ERROR: Couldn't create a git repository.", e);
  }
};

export default gitCreate;
