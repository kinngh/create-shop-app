import inquirer from "inquirer";
import constants from "./constants.js";
import logger from "./utils/logger.js";
import validateProjectName from "./utils/validateProjectName.js";
const { defaultName } = constants;

/*
  Template for building CLI options

      // MARK:- Option

      const { techName } = await inquirer.prompt({
        name: "techName",
        type: "list",
        message: "QUESTION",
        choices: [
          { name: "option1", value: "option1", short: "option1" },
          { name: "option2", value: "option2", short: "option2" },
          { name: "option3", value: "option3", short: "option3" },
          { name: "option4", value: "option4", short: "option4" },
        ],
        default: defaultOptions.techName,
      });
      cliResults.techName = techName
  
      ========================================================================
      
      // MARK:- Boolean

      const { techName } = await inquirer.prompt({
        name: "techName",
        type: "confirm",
        message: "QUESTION",
        default: true,
      });
      cliResults.techName = techName;
*/

const defaultOptions = {
  projectName: defaultName,
  language: "js",
  architecture: "server",
  routing: "raviger",
  eslint: "install_o",
  fetch: "react-query",
  database: "mongodb",
  redis: false,
  webhooks: "none",
  billing: "free",
};

const runCli = async () => {
  const cliResults = defaultOptions;

  try {
    /*
      App Name
    */
    const { projectName } = await inquirer.prompt({
      name: "projectName",
      type: "input",
      message: "What will your project be called?",
      default: defaultOptions.projectName,
      validate: validateProjectName,
      transformer: (input) => {
        return input.trim();
      },
    });
    cliResults.projectName = projectName;

    /*
      Language: JavaScript or TypeScript
    */
    const { language } = await inquirer.prompt({
      name: "language",
      type: "list",
      message: "What language do you want to use?",
      choices: [
        { name: "JavaScript", value: "js", short: "js" },
        { name: "TypeScript", value: "ts", short: "ts" },
      ],
      default: defaultOptions.language,
    });
    cliResults.language = language;

    /*
      Architecture: Server or Serverless
    */
    const { architecture } = await inquirer.prompt({
      name: "architecture",
      type: "list",
      message:
        "Do you want to use a Server (Express.js) or Serverless (Next.js)",
      choices: [
        { name: "Server (Express.js)", value: "server", short: "server" },
        {
          name: "Serverless (Next.js)",
          value: "serverless",
          short: "serverless",
        },
      ],
      default: defaultOptions.architecture,
    });
    cliResults.architecture = architecture;

    /*
      Routing: React Router DOM, Raviger or Next.js (serverless only)
    */
    if (cliResults.architecture !== "serverless") {
      const { routing } = await inquirer.prompt({
        name: "routing",
        type: "list",
        message: "What routing library do you want to use",
        choices: [
          {
            name: "React Router DOM",
            value: "react_router_dom",
            short: "react_router_dom",
          },
          { name: "Raviger", value: "raviger", short: "raviger" },
        ],
        default: defaultOptions.routing,
      });
      cliResults.routing = routing;
    } else {
      cliResults.routing = "next";
    }

    /*
      ESLint: Install, Install and configure, Don't install
    */
    const { eslint } = await inquirer.prompt({
      name: "eslint",
      type: "list",
      message: "Do you want to enable linting with ESLint?",
      choices: [
        { name: "Install Only", value: "install", short: "install" },
        {
          name: "Install and add recommended rules",
          value: "install_setup",
          short: "install_setup",
        },
        { name: "No", value: "none", short: "none" },
      ],
      default: defaultOptions.eslint,
    });
    cliResults.eslint = eslint;

    /*
      Fetch: Apollo/Client, React-Query
    */
    const { fetch } = await inquirer.prompt({
      name: "fetch",
      type: "list",
      message: "What fetch library do you want to use?",
      choices: [
        {
          name: "Apollo/Client",
          value: "apollo_client",
          short: "apollo_client",
        },
        { name: "React-Query", value: "react_query", short: "react_query" },
      ],
      default: defaultOptions.fetch,
    });
    cliResults.fetch = fetch;

    /*
      Database: Prisma, MongoDB, Supabase
    */
    const { database } = await inquirer.prompt({
      name: "database",
      type: "list",
      message: "What database do you want to use?",
      choices: [
        {
          name: "Prisma (MySQL, PostgreSQL)",
          value: "prisma",
          short: "prisma",
        },
        { name: "MongoDB", value: "mongoose", short: "mongoose" },
        { name: "Supabase", value: "supabase", short: "supabase" },
      ],
      default: defaultOptions.database,
    });
    cliResults.database = database;

    /*
      Redis: True, False
    */
    const { redis } = await inquirer.prompt({
      name: "redis",
      type: "confirm",
      message: "Use Redis for session storage?",
      default: false,
    });
    cliResults.redis = redis;

    /*
      Webhook: AWS, GCP, Cloudflare, Native
    */
    const { webhook } = await inquirer.prompt({
      name: "webhook",
      type: "list",
      message: "How do you handle webhooks?",
      choices: [
        { name: "Aws EventBridge", value: "aws", short: "aws" },
        { name: "GCP PubSub", value: "gcp", short: "gcp" },
        {
          name: "Cloudflare Workers",
          value: "cloudflare",
          short: "cloudflare",
        },
        { name: "Native", value: "none", short: "none" },
      ],
      default: defaultOptions.webhook,
    });
    cliResults.webhook = webhook;

    /*
      Billing: Free, Freemium, Premium
    */
    const { billing } = await inquirer.prompt({
      name: "billing",
      type: "list",
      message: "What is your app monetization strategy",
      choices: [
        { name: "Free", value: "free", short: "free" },
        { name: "Free and Paid plans", value: "freemium", short: "freemium" },
        { name: "Paid plans only", value: "premium", short: "premium" },
      ],
      default: defaultOptions.billing,
    });
    cliResults.billing = billing;

    // spacer
  } catch (err) {
    if (err instanceof Error && err.isTTYError) {
      logger.warn(
        `${defaultName} needs an interactive terminal to provide options`
      );
      logger.info(
        `Bootstrapping a default create-shop-app in ./${cliResults.projectName}`
      );
    } else {
      throw err;
    }
  }

  return cliResults;
}; //runCli

export default runCli;
