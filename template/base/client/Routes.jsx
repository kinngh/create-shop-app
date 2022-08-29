import ActiveSubscriptions from "./pages/debug/ActiveSubscriptions";
import ActiveWebhooks from "./pages/debug/ActiveWebhooks";
import FetchData from "./pages/debug/FetchData";
import Fullscreen from "./pages/debug/Fullscreen";
import PolarisViz from "./pages/debug/PolarisViz";
import RecurringSubscription from "./pages/debug/RecurringSubscription";
import Index from "./pages/Index";

const routes = {
  "/": () => <Index />,
  "/debug": () => <Index />,
  "/debug/activeWebhooks": () => <ActiveWebhooks />,
  "/debug/activeSubscriptions": () => <ActiveSubscriptions />,
  "/debug/fetchData": () => <FetchData />,
  "/debug/fullscreen": () => <Fullscreen />,
  "/debug/polarisViz": () => <PolarisViz />,
  "/debug/recurringSubscription": () => <RecurringSubscription />,
};

export default routes;
