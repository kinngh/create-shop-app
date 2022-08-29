import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";

function useFetch() {
  const app = useAppBridge();
  const fetch = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetch(uri, options);
    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader =
        response.headers.get("X-Shopify-API-Request-Failure-Reauthorize-Url") ||
        `/auth`;

      const redirect = Redirect.create(app);
      redirect.dispatch(
        Redirect.Action.REMOTE,
        authUrlHeader.startsWith("/")
          ? `https://${window.location.host}${authUrlHeader}`
          : authUrlHeader
      );
    }
    return response;
  };
}

export default useFetch;
