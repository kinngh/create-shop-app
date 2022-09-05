import ActiveSubscriptions from "./pages/debug/ActiveSubscriptions";
import ActiveWebhooks from "./pages/debug/ActiveWebhooks";
import DebugIndex from "./pages/debug/DebugIndex";
import FetchData from "./pages/debug/FetchData";
import FullScreen from "./pages/debug/FullScreen";
import PolarisViz from "./pages/debug/PolarisViz";
import RecurringSubscription from "./pages/debug/RecurringSubscription";
import Index from "./pages/Index";

const routes = {
  "/": () => <Index />,
  "/debug": () => <DebugIndex />,
  "/debug/activeWebhooks": () => <ActiveWebhooks />,
  "/debug/activeSubscriptions": () => <ActiveSubscriptions />,
  "/debug/fetchData": () => <FetchData />,
  "/debug/fullscreen": () => <FullScreen />,
  "/debug/polarisViz": () => <PolarisViz />,
  "/debug/recurringSubscription": () => <RecurringSubscription />,
};

export default routes;
