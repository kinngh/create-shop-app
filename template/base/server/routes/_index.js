const { default: Shopify } = require("@shopify/shopify-api");

const userRoutes = require("express").Router();
userRoutes.use("/api", require("./recurringSubscription")); //Recurring subscription
userRoutes.use("/api", require("./usageBasedCharge")); //Usage based charges

userRoutes.get("/api", (req, res) => {
  const payload = { text: "User GET route working as expected" };
  res.status(200).send(payload);
});

userRoutes.post("/api", (req, res) => {
  const payload = req.body;
  res
    .status(200)
    .send({ text: "User POST route working as expected", ...payload });
});

userRoutes.get("/api/gql", async (req, res) => {
  // false -> offline session token
  // true -> online session token
  const session = await Shopify.Utils.loadCurrentSession(req, res, false);
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

  const shop = await client.query({
    data: `{
            shop{
                name
            }
        }`,
  });

  res
    .status(200)
    .send({ payload: "User GraphQL route working as expected", ...shop });
});

module.exports = userRoutes;
