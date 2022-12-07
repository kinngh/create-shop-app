//CSA:- All providers need to align properly here or it's going to be an issue
// Idea: Make all providers in `providers/` and bring over generics so only the files can be replaced

import {
  NavigationMenu,
  Provider as AppBridgeProvider,
} from "@shopify/app-bridge-react";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";

import ApolloClientProvider from "./providers/ApolloClientProvider";

import { useRoutes } from "raviger";
import routes from "./Routes";

const appBridgeConfig = { //CSA:- Use the Shopify way to setup config?
  apiKey: process.env.SHOPIFY_API_KEY,
  host: new URL(location).searchParams.get("host"),
  forceRedirect: true,
};

export default function App() {
  const RouteComponents = useRoutes(routes);

  return (
    <PolarisProvider i18n={translations}>
      <AppBridgeProvider config={appBridgeConfig}>
        <NavigationMenu
          navigationLinks={[
            {
              label: "Home",
              destination: "/",
            },
            {
              label: "Get Data",
              destination: "/getData",
            },
          ]}
        />
        <ApolloClientProvider>{RouteComponents}</ApolloClientProvider>
      </AppBridgeProvider>
    </PolarisProvider>
  );
}

//MyProvider is now providers/ApolloProvider
//userLoggedInFetch() is now hooks/useFetch()
