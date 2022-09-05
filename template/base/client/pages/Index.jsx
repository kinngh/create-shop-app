import { Card, Layout, Page } from "@shopify/polaris";
import { navigate } from "raviger";
import React from "react";

const Index = () => {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card
            sectioned
            title="Debug Cards"
            primaryFooterAction={{
              content: "Debug",
              onAction: () => {
                navigate("/debug");
              },
            }}
          >
            <p>
              Check out debug cards for an insight into webhooks, subscriptions
              and more.
            </p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Index;
