import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const APIURL =
  "https://api.thegraph.com/subgraphs/name/dhairya-creatoros/grant-manager-subgraph";

const grantsCountQuery = `
  query {
    grantCounts(first: 1) {
      count
    }
  }
`;

const getAllGrantsQuery = `
  query{
    grants(first: 1000, skip: **) {
      id
      owner
      payee
      data
      amount
    }
  }
`

class GrantManagerSubgraph {
  constructor() {
    const client = new ApolloClient({
      uri: APIURL,
      cache: new InMemoryCache(),
    });
    this.client = client;
    this.skipped = 0;
  }

  async getGrantsCount() {
    const data = await this.client.query({
      query: gql(grantsCountQuery),
    });

    return data;
  }
  
  async getAllGrants() {
    const newQuery = getAllGrantsQuery.replace("**", this.skipped);
    console.log(newQuery);
    const data = await this.client.query({
      query: gql(newQuery),
    });
    console.log(data);
    this.skipped += 1000;
    return data;
  }
}

export default GrantManagerSubgraph;
