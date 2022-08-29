import chalk from "chalk";

const logger = {
  error(...content) {
    console.log(chalk.red(...content));
  },
  warn(...content) {
    console.log(chalk.yellow(...content));
  },
  info(...content) {
    console.log(chalk.cyan(...content));
  },
  success(...content) {
    console.log(chalk.green(...content));
  },
};

export default logger;
