/*
    Init git repo for the project
*/

import ora from "ora";
import execCommand from "../utils/execCommand.js";
import logger from "../utils/logger.js";

const gitCreate = async (projectDir) => {
  logger.info("Creating Git Repo...");
  const spinner = ora("creating a new git repo...").start();

  try {
    const gitInit = "git init && git branch -m main";
    await execCommand(gitInit, { cwd: projectDir });
    spinner.succeed(logger.success("Successfully Initialized Repository"));
  } catch (e) {
    logger.error("FAIL: Couldn't create a git repository.");
  }
};

export default gitCreate;
