//Please do not delete index or exitframe unless you know what you're doing.

import ExitFrame from "./ExitFrame";
import Index from "./pages/Index";

const routes = {
  "/": () => <Index />,
  "/exitframe": () => <ExitFrame />,
};

export default routes;
