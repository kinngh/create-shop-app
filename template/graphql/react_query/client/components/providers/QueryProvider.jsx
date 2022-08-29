import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "react-query";

const QueryProvider = ({ children }) => {
  const client = new QueryClient({
    queryCache: new QueryCache(),
    mutationCache: new MutationCache(),
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QueryProvider;
