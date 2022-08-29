import chalk from "chalk";
import { Command } from "commander";
import inquirer from "inquirer";
import constants from "./constants.js";
import getVersion from "./utils/getCLIVersion.js";
import logger from "./utils/logger.js";
import validateAppName from "./utils/validateAppName.js";
const { defaultName } = constants;

const defaultOptions = {
  appName: defaultName,
  databaseTech: "mongodb",
  graphqlTech: "apollo_client",
  // billingAPI: "free",
  // language: "js",
  flags: { git: true },
};

const runCli = async () => {
  const cliResults = defaultOptions;

  const program = new Command().name(defaultName);

  program
    .description("A CLI for creating custom Shopify applications")
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create"
    )
    .option(
      "--git",
      "Explicitly tell the CLI to not initialize a new git repo in the project",
      false
    )
    // .option(
    //   "--y",
    //   "Bypass the CLI and use all default options to bootstrap a new shop app",
    //   false
    // )
    .version(getVersion(), "-v, --version", "Display the version number")
    .addHelpText(
      "afterAll",
      `\nThe create-shop-app was created by ${chalk
        .hex("#E8DCFF")
        .bold("@kinngh")}\n
        https://twitter.com/kinngh\n`
    )
    .parse(process.argv);

  const cliProvidedName = program.args[0];
  if (cliProvidedName) {
    cliResults.appName = cliProvidedName;
  }

  cliResults.flags = program.opts();

  try {
    if (!cliProvidedName) {
      const { appName } = await inquirer.prompt({
        name: "appName",
        type: "input",
        message: "What will your project be called?",
        default: defaultOptions.appName,
        validate: validateAppName,
        transformer: (input) => {
          return input.trim();
        },
      });
      cliResults.appName = appName;
    }

    const { databaseTech } = await inquirer.prompt({
      name: "databaseTech",
      type: "list",
      message: "What datbase would you like to use?",
      choices: [
        { name: "MongoDB", value: "mongodb", short: "mongodb" },
        { name: "Supabase", value: "supabase", short: "supabase" },
        { name: "Prisma (Coming Soon)", value: "prisma", short: "prisma" },
        { name: "Postgre (Coming Soon)", value: "Postgre", short: "Postgre" },
      ],
      default: defaultOptions.databaseTech,
    });

    cliResults.databaseTech = databaseTech;

    // const { language } = await inquirer.prompt({
    //   name: "language",
    //   type: "list",
    //   message: "Which language do you prefer?",
    //   choices: [
    //     { name: "JavaScript", value: "js", short: "js" },
    //     { name: "TypeScript", value: "ts", short: "ts" },
    //   ],
    //   default: defaultOptions.language,
    // });

    // cliResults.language = language;

    const { graphqlTech } = await inquirer.prompt({
      name: "graphqlTech",
      type: "list",
      message: "What GraphQL tech would you like to use?",
      choices: [
        {
          name: "Apollo Client",
          value: "apollo_client",
          short: "apollo_client",
        },
        { name: "React Query", value: "react_query", short: "react_query" },
      ],
      default: defaultOptions.graphqlTech,
    });

    cliResults.graphqlTech = graphqlTech;

    // const { billingAPI } = await inquirer.prompt({
    //   name: "billingAPI",
    //   type: "list",
    //   message: "How would you monetize your app?",
    //   choices: [
    //     { name: "Free", value: "free", short: "free" },
    //     {
    //       name: "Subscription (Free + Paid)",
    //       value: "subscription_freemium",
    //       short: "subscription_freemium",
    //     },
    //     {
    //       name: "Subscription (Paid Only)",
    //       value: "subscription",
    //       short: "subscription",
    //     },
    //     { name: "Usage Based Charges", value: "usage", short: "usage" },
    //   ],
    //   default: defaultOptions.billingAPI,
    // });
    // cliResults.billingAPI = billingAPI;

    const { git } = await inquirer.prompt({
      name: "git",
      type: "confirm",
      message: "Would you like to init a new git repository?",
      default: true,
    });
    cliResults.flags.git = git;

    if (git) {
      logger.success("Initializing repository!");
    } else {
      logger.info("No git repository created");
    }
  } catch (err) {
    if (err instanceof Error && err.isTTYError) {
      logger.warn(
        `${defaultName} needs an interactive terminal to provide options`
      );
      logger.info(
        `Bootstrapping a default create-shop-app in ./${cliResults.appName}`
      );
    } else {
      throw err;
    }
  }

  return cliResults;
}; //runCli

export default runCli;
