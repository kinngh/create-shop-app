import gradient from "gradient-string";
import constants from "../constants.js";
import getPackageManager from "../utils/getPackageManager.js";
const { title } = constants;

const colorScheme = {
  a: "#E63946",
  b: "#F1FAEE",
  c: "#A8DADC",
  d: "#457B9D",
  e: "#1D3557",
};

const renderTitle = () => {
  const myGradient = gradient(Object.values(colorScheme));

  const packageManger = getPackageManager();
  if (packageManger !== "npm") {
    console.log("");
  }

  console.log(myGradient.multiline(title));
};

export default renderTitle;
