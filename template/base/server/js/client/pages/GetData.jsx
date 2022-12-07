import { Card, Layout, Page } from "@shopify/polaris";
import { navigate } from "raviger";
import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const GetData = () => {
  const [responseData, setResponseData] = useState("");
  const [responseDataPost, setResponseDataPost] = useState("");
  const [responseDataGQL, setResponseDataGQL] = useState("");
  const fetch = useFetch();

  async function fetchContent() {
    setResponseData("loading...");
    const res = await fetch("api"); //fetch instance of useFetch()
    const { text } = await res.json();
    setResponseData(text);
  }
  async function fetchContentPost() {
    setResponseDataPost("loading...");
    const postBody = JSON.stringify({ content: "Body of POST request" });
    const res = await fetch("api", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: postBody,
    }); //fetch instance of useFetch()

    const { content } = await res.json();
    setResponseDataPost(content);
  }

  async function fetchContentGQL() {
    setResponseDataGQL("loading...");
    const res = await fetch("api/gql"); //fetch instance of useFetch()
    const response = await res.json();
    setResponseDataGQL(response.body.data.shop.name);
  }

  useEffect(() => {
    fetchContent();
    fetchContentPost();
    fetchContentGQL();
  }, []);

  return (
    <Page
      title="Get data from Express route"
      breadcrumbs={[{ content: "Home", onAction: () => navigate("/") }]}
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

export default GetData;
