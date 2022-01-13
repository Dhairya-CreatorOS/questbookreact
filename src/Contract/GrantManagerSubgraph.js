import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const APIURL =
  "https://api.thegraph.com/subgraphs/name/dhairya-creatoros/grant-manager-subgraph";

const grantsCountQuery = `
  query {
    
    grantCounts(first: 1) {
      id
      count
    }
  }
`;

class GrantManagerSubgraph {
  constructor() {
    const client = new ApolloClient({
      uri: APIURL,
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
