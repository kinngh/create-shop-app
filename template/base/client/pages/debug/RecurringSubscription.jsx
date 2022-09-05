import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { Card, Layout, Page } from "@shopify/polaris";
import { navigate } from "raviger";
import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";

const RecurringSubscription = () => {
  const [responseData, setResponseData] = useState("");
  const fetch = useFetch();
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  async function fetchContent() {
    setResponseData("loading...");
    const res = await fetch("/apps/api/recurringPay");
    const data = await res.json();
    console.log("data", data);
    if (data.error) {
      setResponseData(data.error);
    } else if (data.confirmationUrl) {
      setResponseData("Redirecting");
      const { confirmationUrl } = data;
      redirect.dispatch(Redirect.Action.REMOTE, confirmationUrl);
    }
  }

  return (
    <Page
      title="Subscribe Merchant"
      breadcrumbs={[{ content: "Home", onAction: () => navigate("/debug") }]}
    >
      <Layout>
        <Layout.Section>
          <Card
            sectioned
            primaryFooterAction={{
              content: "Subscribe merchant",
              onAction: () => {
                fetchContent();
              },
            }}
          >
            <p>
              Subscribe your merchant to a test $10.25 plan and redirect to your
              home page.
            </p>

            {
              /* If we have an error, it'll pop up here. */
              responseData && <p>{responseData}</p>
            }
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default RecurringSubscription;
