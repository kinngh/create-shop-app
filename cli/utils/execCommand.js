import { exec } from "child_process";
import { promisify } from "util";

const execCommand = promisify(exec);

export default execCommand;
