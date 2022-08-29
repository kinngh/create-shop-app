const { default: Shopify } = require("@shopify/shopify-api");
const appUninstallHandler = require("./app_uninstalled.js");

const webhookRegistrar = () => {
  Shopify.Webhooks.Registry.addHandlers({
    APP_UNINSTALLED: {
      path: "/webhooks/app_uninstalled",
      webhookHandler: appUninstallHandler,
    },
  });
};

module.exports = webhookRegistrar;
