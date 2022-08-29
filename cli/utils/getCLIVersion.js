import path from "path";
import fs from "fs-extra";
import constants from "../constants.js";
const { packageRoot } = constants;

const getVersion = () => {
  const packageJsonPath = path.join(packageRoot, "package.json");
  const packageJsonContent = fs.readJsonSync(packageJsonPath);
  return packageJsonContent.version ?? "1.0.0";
};

export default getVersion;
