import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://127.0.0.1:3000/graphql",
  cache: new InMemoryCache(),
});

interface IApolloConfig {
  children: React.ReactElement;
}

export const ApolloConfig: React.FC<IApolloConfig> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
