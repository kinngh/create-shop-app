const { Shopify } = require("@shopify/shopify-api");
const { gdprTopics } = require("@shopify/shopify-api/dist/webhooks/registry");
const topLevelAuthRedirect = require("../../utils/topLevelAuthRedirect");

const authMiddleware = (app) => {
  app.get("/auth", async (req, res) => {
    if (!req.signedCookies[app.get("top-level-oauth-cookie")]) {
      return res.redirect(`/auth/toplevel?shop=${req.query.shop}`);
    }

    if (!req.query.shop) {
      return res.status(500).send("No shop provided");
    }

    try {
      const redirectUrl = await Shopify.Auth.beginAuth(
        req,
        res,
        req.query.shop,
        "/auth/tokens",
        false
      );
      res.redirect(redirectUrl);
    } catch (e) {
      console.error(`---> Error at /auth for ${req.query.shop}.`, e);
      res.send("An error occured. Please contact the developer");
    }
  });

  app.get("/auth/tokens", async (req, res) => {
    try {
      const session = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query
      );

      const { shop, accessToken } = session;

      const webhookRegistrar = await Shopify.Webhooks.Registry.registerAll({
        shop,
        accessToken,
      });

      Object.entries(webhookRegistrar).map(([topic, response]) => {
        if (response.success) {
          console.log(`--> Registered ${topic} for ${shop}`);
        } else if (!gdprTopics.includes(topic)) {
          console.error(
            `---> Failed to register ${topic} for ${shop}. Reason:`,
            response.result.errors
          );
        }
      });

      const redirectUrl = await Shopify.Auth.beginAuth(
        req,
        res,
        req.query.shop,
        "/auth/callback",
        true
      );

      res.redirect(redirectUrl);
    } catch (e) {
      console.error(`---> Error at /auth/tokens for ${req.query.shop}.`, e);
      res.redirect(`/auth?shop=${req.query.shop}`);
    }
  });

  app.get("/auth/callback", async (req, res) => {
    try {
      const session = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query
      );

      const host = req.query.host;
      const shop = session.shop;

      //MARK:- UPDATE SHOP TO TRUE

      res.redirect(`/?shop=${shop}&host=${host}`);
    } catch (e) {
      const { shop } = req.query;
      switch (true) {
        case e instanceof Shopify.Errors.InvalidOAuthError:
          res.status(400);
          res.send(e.message);
          break;
        case e instanceof Shopify.Errors.CookieNotFound:
        case e instanceof Shopify.Errors.SessionNotFound:
          // This is likely because the session timed out as the merchant waited too long.
          res.redirect(`/auth?shop=${shop}`);
          break;
        default:
          res.status(500);
          res.send(e.message);
          break;
      }
    }
  });

  app.get("/auth/toplevel", (req, res) => {
    res.cookie(app.get("top-level-oauth-cookie"), "1", {
      signed: true,
      httpOnly: true,
      sameSite: "strict",
    });

    res.set("Content-Type", "text/html");

    res.send(
      topLevelAuthRedirect({
        apiKey: Shopify.Context.API_KEY,
        appOrigin: Shopify.Context.HOST_NAME,
        shop: req.query.shop,
      })
    );
  });
};

module.exports = authMiddleware;
