import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat } from "@apollo/client";

const httpLink = new HttpLink({ uri: '/api/* http://172.105.92.130:4000/graphql:splat 200!' });


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