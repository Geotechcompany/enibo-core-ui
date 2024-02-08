import { ApolloClient, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
    uri: 'http://139.144.183.163:5050/graphql',
    cache: new InMemoryCache(),
  });

export default client;