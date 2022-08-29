import path from "path";
import { fileURLToPath } from "url";

const title = `                        __                      __                                         
.----.----.-----.---.-|  |_.-----.______.-----|  |--.-----.-----.______.---.-.-----.-----.
|  __|   _|  -__|  _  |   _|  -__|______|__ --|     |  _  |  _  |______|  _  |  _  |  _  |
|____|__| |_____|___._|____|_____|      |_____|__|__|_____|   __|      |___._|   __|   __|
                                                          |__|               |__|  |__|`;

const defaultName = `my-shop-app`;
const createApp = `create-shop-app`;
const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
const packageRoot = path.join(distPath, "../");

export default { packageRoot, title, defaultName, createApp };
