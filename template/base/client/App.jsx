import { NavigationMenu } from "@shopify/app-bridge-react";
import AppBridgeProvider from "./components/providers/AppBridgeProvider";
import PolarisProvider from "./components/providers/PolarisProvider";
import QueryProvider from "./components/providers/QueryProvider";
import RouteProvider from "./components/providers/RouteProvider";

const App = () => {
  return (
    <PolarisProvider>
      <AppBridgeProvider>
        <QueryProvider>
          <NavigationMenu
            navigationLinks={[{ label: "Home", destination: "/" }]}
          />
          <RouteProvider />
        </QueryProvider>
      </AppBridgeProvider>
    </PolarisProvider>
  );
};

export default App;
