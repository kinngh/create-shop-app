/*
//CSA:- Webhook handling
If native, leave it here
If Cloudflare, AWS or GCP, have it be a separate deployable folder
*/


//Combine all your webhooks here
import { Shopify } from "@shopify/shopify-api";
import appUninstallHandler from "./app_uninstalled.js";

const webhookRegistrar = async () => {
  Shopify.Webhooks.Registry.addHandlers({
    APP_UNINSTALLED: {
      path: "/webhooks/app_uninstalled",
      webhookHandler: appUninstallHandler,
    },
  });
};

export default webhookRegistrar;
