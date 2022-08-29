const { default: Shopify } = require("@shopify/shopify-api");

const verifyRequest = (app, { returnHeader = true } = {}) => {
  return async (req, res, next) => {
    const shop = req.query.shop;

    if (!shop || shop === "" || typeof shop === "undefined") {
      return res
        .status(400)
        .send("Could not find a shop to authenticate with.");
    }

    const session = await Shopify.Utils.loadCurrentSession(req, res, true);

    if (session.isActive()) {
      console.log(`-----> Scope from .env: ${process.env.SCOPES}`);
      console.log(`-----> Scope from Shopify: ${Shopify.Context.SCOPES}`);
      next();
    } else {
      res.redirect(`/auth?shop=${shop}`);
    }

    if (returnHeader) {
      if (!shop) {
        if (session) {
          shop = session.shop;
        } else if (Shopify.Context.IS_EMBEDDED_APP) {
          const authheader = req.headers.authorization?.match(/Bearer (.*)/);
          if (authheader) {
            const payload = Shopify.Utils.decodeSessionToken(authheader[1]);
            shop = payload.dest.replace("https://", "");
          }
        }
      }

      res.status(403);
      res.header("X-Shopify-API-Request-Failure-Reauthorize", "1");
      res.header(
        "X-Shopify-API-Request-Failure-Reauthorize-Url",
        `/auth?shop=${shop}`
      );
      res.end();
    } else {
      res.redirect(`/auth?shop=${shop}`);
    }
  };
};

module.exports = verifyRequest;
