/*

  DEV ONLY --> `npm run update:url`

  LIMITATION:
  - [OEM] Cannot update GDPR URLs.
  - [OEM] Cannot update App Proxy URL.
 */

import {
  api as cliAPI,
  error as cliError,
  session,
  ui as cliUI,
} from "@shopify/cli-kit";
import "dotenv/config";

const selectOrg = async (accessToken) => {
  const orgs = await getOrgs(accessToken);
  const org = await selectOrgCLI(orgs);
  return org.id;
};

const getOrgs = async (accessToken) => {
  const response = await cliAPI.partners.request(
    cliAPI.graphql.AllOrganizationsQuery,
    accessToken
  );
  const orgs = response.organizations.nodes;
  if (orgs.length === 0) {
    return new cliError.Abort(
      `There was a problem connecting to the org. Please check that the org exists and/or you have access. You can logout using\n npm run shopify auth logout`
    );
  }
  return orgs;
};

const selectOrgCLI = async (orgs) => {
  if (orgs.length === 1) {
    return orgs[0];
  }
  const orgList = orgs.map((org) => ({
    name: org.businessName,
    value: org.id,
  }));

  const choice = await cliUI.prompt([
    {
      type: "autocomplete",
      name: "id",
      message: "Select a Shopify Partner org for this app",
      choices: orgList,
    },
  ]);

  return orgs.find((org) => org.id === choice.id);
};

const getApp = async (apiKey, accessToken) => {
  const response = await cliAPI.partners.request(
    cliAPI.graphql.FindAppQuery,
    accessToken,
    {
      apiKey,
    }
  );
  return response.app;
};
const updateDashboardURLs = async (apiKey, appUrl) => {
  const accessToken = await session.ensureAuthenticatedPartners();

  const urls = {
    applicationUrl: appUrl,
    redirectUrlWhitelist: [`${appUrl}/auth/tokens`, `${appUrl}/auth/callback`],
  };

  const query = cliAPI.graphql.UpdateURLsQuery;
  const result = await cliAPI.partners.request(query, accessToken, {
    apiKey,
    ...urls,
  });
  if (result.appUpdate.userErrors.length > 0) {
    const errors = result.appUpdate.userErrors
      .map((error) => error.message)
      .join(", ");

    throw new errors.Abort(errors);
  }
};

console.warn("--> This is for use in DEV mode only");
console.log("--> Fetching Access Tokens");
const accessToken = await session.ensureAuthenticatedPartners();
console.log("--> Fetching Orgs");
await selectOrg(accessToken);
console.log("--> Fetching App Data");
const app = await getApp(process.env.SHOPIFY_API_KEY, accessToken);
console.log("--> Updating URLs");
await updateDashboardURLs(app.apiKey, process.env.SHOPIFY_APP_URL);
console.log("--> URLs updated. Please update GDPR and Proxy routes manually");
console.log("--> Done");
