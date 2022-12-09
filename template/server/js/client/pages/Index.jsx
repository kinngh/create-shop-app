import React from "react";
import { Page, Card, Layout } from "@shopify/polaris";
import { navigate } from "raviger";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Fullscreen } from "@shopify/app-bridge/actions";

const HomePage = () => {
  const app = useAppBridge();
  const fullscreen = Fullscreen.create(app);
  fullscreen.dispatch(Fullscreen.Action.EXIT);
  return (
    <React.Fragment>
      <Page title="Debug Cards">
        <Layout>
          <Layout.Section>
            <Card title="It's alive" sectioned>
              <p>
                <code>create-shop-app</code> is alive. Now, onto redoing the
                entire example series.
              </p>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </React.Fragment>
  );
};

export default HomePage;
