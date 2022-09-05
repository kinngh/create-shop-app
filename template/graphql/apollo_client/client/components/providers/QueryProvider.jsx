import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import useFetch from "../../hooks/useFetch";

function QueryProvider({ children }) {
  const fetch = useFetch();

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      credentials: "include",
      fetch: fetch,
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default QueryProvider;
