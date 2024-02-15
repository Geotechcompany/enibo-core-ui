import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat } from "@apollo/client";

const httpLink = new HttpLink({ uri: 'http://192.168.1.45:4000/graphql' });


const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization:  token ?? `Bearer ${token}` ,
    }
  }));

  return forward(operation);
})


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default client;