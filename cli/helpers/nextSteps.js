import logger from "../utils/logger.js";
import getPackageManager from "../utils/getPackageManager.js";
import constants from "../constants.js";
const { default_name } = constants;

const nextSteps = ({ projectName = default_name, packages, dontInstall }) => {
  const packageManager = getPackageManager();
  logger.info("Next steps:");
  logger.info(` --> cd ${projectName}`);
  if (dontInstall) {
    logger.info(` --> ${packageManager} install`);
  }

  // if (packages.prisma.inUse) {
  //   logger.info(
  //     ` --> ${packageManager === "npm" ? "npx" : packageManager} prisma db push`
  //   );
  // }

  logger.info(
    ` --> ${packageManager === "npm" ? "npm run" : packageManager} dev`
  );
};

export default nextSteps;
