require("dotenv").config();
require("../devUtils/setupCheck")();
const Express = require("express");
const cookieParser = require("cookie-parser");
const { default: Shopify } = require("@shopify/shopify-api");
const path = require("path");
const userRoutes = require("./routes/_index");
const proxyRouter = require("./routes/app_proxy/_index");
const webhookRegistrar = require("./webhooks/_index");
const sessionStorage = require("../utils/sessionStorage");
const {
  authMiddleware,
  csp,
  isShopActive,
  verifyHmac,
  verifyProxy,
  verifyRequest,
} = require("./middleware/_index");
const {
  customerDataRequest,
  customerRedact,
  shopRedact,
} = require("./controllers/gdpr/_index");

const PORT = parseInt(process.env.PORT, 10) || 8081;
const isDev = process.env.NODE_ENV === "dev";

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SHOPIFY_API_SCOPES,
  HOST_NAME: process.env.SHOPIFY_APP_URL.replace(/https:\/\//, ""),
  HOST_SCHEME: "https",
  API_VERSION: process.env.SHOPIFY_API_VERSION,
  IS_EMBEDDED_APP: true,
  SESSION_STORAGE: sessionStorage,
});

webhookRegistrar();

const createServer = async (root = process.cwd()) => {
  const app = Express();

  app.set("top-level-oauth-cookie", "shopify_top_level_oauth");
  app.use(cookieParser(Shopify.Context.API_SECRET_KEY));

  authMiddleware(app);

  app.post("/webhooks/:topic", async (req, res) => {
    try {
      const { topic } = req.params;
      const shop = req.headers["x-shopify-shop-domain"];
      await Shopify.Webhooks.Registry.process(req, res);
      console.log(`--> Processed ${topic} for ${shop}`);
    } catch (e) {
      console.error(`---> Error while processing ${topic} for ${shop}`, e);
      if (!res.headersSent) {
        res.status(500).send(e.message);
      }
    }
  });
  app.post("/graphql", verifyRequest(app), async (req, res) => {
    try {
      const response = await Shopify.Utils.graphqlProxy(req, res);
      res.status(200).send(response.body);
    } catch (err) {
      console.error(err.response);
      res.status(500).send(err.response);
    }
  });

  app.use(Express.json());
  app.use(csp);
  app.use(isShopActive);
  // Add `hasRecurringSubscription` after verifyRequest as a middleware if you want to paygate the entire app.
  app.use("/apps", verifyRequest(app), userRoutes); //MARK:- User routes
  app.use("/proxy_route", verifyProxy, proxyRouter); //MARK:- App proxy routes

  app.post("/gdpr/:topic", verifyHmac, async (req, res) => {
    const { body } = req;
    const { topic } = req.params;
    const shop = req.body.shop_domain;

    console.warn(`---> GDPR request for ${shop} / ${topic} recieved.`);

    let response;
    switch (topic) {
      case "customers_data_request":
        response = await customerDataRequest(topic, shop, body);
        break;
      case "customers_redact":
        response = await customerRedact(topic, shop, body);
        break;
      case "shop_redact":
        response = await shopRedact(topic, shop, body);
        break;
      default:
        console.error(
          "---> Congratulations on breaking the GDPR route! Here's the topic that broke it:",
          topic
        );
        response = "broken";
        break;
    }

    if (response.success) {
      res.status(200).send();
    } else {
      res.status(400).send("An error occured");
    }
  });

  let vite;
  if (isDev) {
    vite = await import("vite").then(({ createServer }) =>
      createServer({
        root: path.join(root, "client"),
        logLevel: isDev ? "error" : "info",
        server: {
          port: PORT,
          hmr: {
            protocol: "ws",
            host: "localhost",
            port: 64999,
            clientPort: 64999,
          },
          middlewareMode: "html",
        },
      })
    );

    app.use(vite.middlewares);
  } else {
    const compression = await import("compression").then(
      ({ default: fn }) => fn
    );
    const serveStatic = await import("serve-static").then(
      ({ default: fn }) => fn
    );
    const fs = await import("fs");

    app.use(compression());
    app.use(serveStatic(resolve("dist/client")));
    app.use("/*", (req, res, next) => {
      res
        .status(200)
        .set("Content-Type", "text/html")
        .send(fs.readFileSync(`${root}/dist/client/index.html`));
    });
  }

  return { app };
}; //createServer

createServer().then(({ app }) => {
  app.listen(PORT, () => {
    console.log(`--> Server running on localhost:${PORT}`);
  });
});
