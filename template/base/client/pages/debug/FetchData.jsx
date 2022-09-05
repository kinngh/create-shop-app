import React, { useEffect, useState } from "react";
import { navigate } from "raviger";
import { Page, Card, Layout } from "@shopify/polaris";
import useFetch from "../../hooks/useFetch";

const FetchData = () => {
  const [responseData, setResponseData] = useState("");
  const [responseDataPost, setResponseDataPost] = useState("");
  const [responseDataGQL, setResponseDataGQL] = useState("");
  const fetch = useFetch();

  const fetchContent = async () => {
    setResponseData("loading...");
    const res = await fetch(`/apps/api`);
    const { text } = await res.json();
    setResponseData(text);
  };
  const fetchContentPost = async () => {
    setResponseDataPost("loading...");
    const postBody = JSON.stringify({ content: "Body of POST request" });
    const res = await fetch("/apps/api", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: postBody,
    });

    const { content } = await res.json();
    setResponseDataPost(content);
  };

  const fetchContentGQL = async () => {
    setResponseDataGQL("loading...");
    const res = await fetch("/apps/api/gql");
    const response = await res.json();
    setResponseDataGQL(response.body.data.shop.name);
  };

  useEffect(() => {
    fetchContent();
    fetchContentPost();
    fetchContentGQL();
  }, []);

  return (
    <Page
      title="Get data from Express route"
      breadcrumbs={[{ content: "Home", onAction: () => navigate("/debug") }]}
    >
      <Layout>
        <Layout.Section>
          <Card
            sectioned
            primaryFooterAction={{
              content: "Refetch",
              onAction: () => {
                fetchContent();
              },
            }}
          >
            <p>The data we get from "/apps/api" is : {responseData}</p>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card
            sectioned
            primaryFooterAction={{
              content: "Refetch",
              onAction: () => {
                fetchContentPost();
              },
            }}
          >
            <p>POST "/apps/api" is : {responseDataPost}</p>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card
            sectioned
            primaryFooterAction={{
              content: "Refetch GQL",
              onAction: () => {
                fetchContentGQL();
              },
            }}
          >
            <p>The data we get from "/apps/api/gql" is : {responseDataGQL}</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default FetchData;
