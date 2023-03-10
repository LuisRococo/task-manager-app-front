import React from "react";
import fetch from "cross-fetch";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({ uri: "http://127.0.0.1:3000/graphql", fetch }),
  cache: new InMemoryCache(),
});

interface IApolloConfig {
  children: React.ReactElement;
}

export const ApolloConfig: React.FC<IApolloConfig> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
