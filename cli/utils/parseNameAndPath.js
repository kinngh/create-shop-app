import { resolve, basename } from "path";

const parseNameAndPath = (input) => {
  const paths = input.split("/");
  let projectName = paths[paths.length - 1];

  if (projectName === ".") {
    const parsedCwd = resolve(process.cwd());
    projectName = basename(parsedCwd);
  }

  const indexOfDelimiter = paths.findIndex((p) => p.startsWith("@"));
  if (paths.findIndex((p) => p.startsWith("@")) !== -1) {
    projectName = paths.slice(indexOfDelimiter).join("/");
  }

  const path = paths.filter((p) => !p.startsWith("@")).join("/");

  return [projectName, path];
};
export default parseNameAndPath;
