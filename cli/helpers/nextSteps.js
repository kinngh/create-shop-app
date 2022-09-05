import logger from "../utils/logger.js";
import getPackageManager from "../utils/getPackageManager.js";
import constants from "../constants.js";
const { default_name } = constants;

const nextSteps = ({ projectName = default_name }) => {
  const packageManager = getPackageManager();
  logger.info("Next steps:");
  logger.info(` --> cd ${projectName}`);

  logger.info(
    ` --> ${packageManager === "npm" ? "npm run" : packageManager} dev`
  );
};

export default nextSteps;
