/*
  Run a check to see if the app name is valid
*/

const validationRegExp =
  /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

const validateAppName = (input) => {
  const paths = input.split("/");

  const indexOfDelimiter = paths.findIndex((p) => p.startsWith("@"));

  let appName = paths[paths.length - 1];
  if (paths.findIndex((p) => p.startsWith("@")) !== -1) {
    appName = paths.slice(indexOfDelimiter).join("/");
  }

  if (validationRegExp.test(appName ?? "")) {
    return true;
  } else {
    return "App name must be lowercase, alphanumeric, or use -, _, and @";
  }
};

export default validateAppName;
