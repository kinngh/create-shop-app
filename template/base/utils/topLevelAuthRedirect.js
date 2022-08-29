const topLevelAuthRedirect = ({ apiKey, appOrigin, shop }) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/@shopify/app-bridge@3.2.2"></script>
    <script src="https://unpkg.com/@shopify/app-bridge-utils@3.2.2"></script>

    <script>
      document.addEventListener('DOMContentLoaded', function () {
        var appBridgeUtils = window['app-bridge-utils'];

        if (appBridgeUtils.isShopifyEmbedded()) {
          var AppBridge = window['app-bridge'];
          var createApp = AppBridge.default;
          var Redirect = AppBridge.actions.Redirect;

          const app = createApp({
            apiKey: '${apiKey}',
            shopOrigin: '${shop}',
          });

          const redirect = Redirect.create(app);

          redirect.dispatch(
            Redirect.Action.REMOTE,
            'https://${appOrigin}/auth/toplevel?shop=${shop}',
          );
        } else {
          window.location.href = '/auth?shop=${shop}';
        }
      });
    </script>
  </head>
  <body></body>
</html>`;
};

module.exports = topLevelAuthRedirect;
