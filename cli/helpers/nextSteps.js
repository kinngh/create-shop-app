/*
  TODO:
  - Run `npm run update` in the project to bring everything to the latest package version
*/

/*
  Run after boilerplate has been created and everything is updated.
*/

import constants from "../constants.js";
import logger from "../utils/logger.js";
const { default_name } = constants;

const nextSteps = ({ projectName = default_name }) => {
  logger.info(`Next steps:`);
  logger.info(`cd ${projectName}`);
  logger.info(`npm run dev`);
};

export default nextSteps;
