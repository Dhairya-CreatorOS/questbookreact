import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import config from "./config";

const grantsCountQuery = `
  query {
    grantCounts(first: 1) {
      count
    }
  }
`;

class GrantManagerSubgraph {
  constructor() {
    const client = new ApolloClient({
      uri: config.subgraphUri,
      cache: new InMemoryCache(),
    });
    this.client = client;
  }

  async getGrantsCount() {
    const data = await this.client.query({
      query: gql(grantsCountQuery),
    });

    return data;
  }
}

export default GrantManagerSubgraph;
