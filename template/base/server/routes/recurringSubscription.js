const { default: Shopify } = require("@shopify/shopify-api");

const subRoute = require("express").Router();

subRoute.get("/recurringPay", async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(req, res, true);
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

  // Redirect user to /auth on success to ensure they always land on the right page in admin.
  const returnUrl = `${process.env.SHOPIFY_APP_URL}/auth?shop=${session.shop}`;

  const planName = "Pro Plan - $10.10";
  const planPrice = 10.1;

  const response = await client.query({
    data: `mutation CreateSubscription{
    appSubscriptionCreate(
      name: "${planName}"
      returnUrl: "${returnUrl}"
      test: true
      lineItems: [
        {
          plan: {
            appRecurringPricingDetails: {
              price: { amount: ${planPrice}, currencyCode: USD }
            }
          }
        }
      ]
    ) {
      userErrors {
        field
        message
      }
      confirmationUrl
      appSubscription {
        id
        status
      }
    }
  }
`,
  });

  const errorMessage = response.body.data.appSubscriptionCreate.userErrors;
  if (errorMessage) {
    console.log(`--> Error subscribing ${session.shop} to plan:`, errorMessage);
    res.status(401).send({ success: false, message: errorMessage });
    return;
  }

  res.status(200).send({
    success: true,
    confirmationUrl: `${response.body.data.appSubscriptionCreate.confirmationUrl}`,
  });
});

module.exports = subRoute;
