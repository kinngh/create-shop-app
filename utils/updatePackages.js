//MARK:- Defunct

// Upgrade template -> package.json
import ncu from "npm-check-updates";

const upgradePackages = async () => {
  const result = await ncu.run({
    packageFile: `${process.cwd()}/template/base/package.json`,
    upgrade: true,
  });

  if (Object.keys(result).length === 0) {
    console.log("--> All dependencies match the latest package versions");
  } else {
    console.log("Updated the following packages:\n", result);
  }
};

upgradePackages();
