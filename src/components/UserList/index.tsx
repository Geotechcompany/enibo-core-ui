import  ReactDOM  from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache  } from '@apollo/client';
// import 'src/index.css';
import App from '@/App';

 const client = new ApolloClient({
    uri: 'http://192.168.1.45:4000/graphql',
    cache: new InMemoryCache(),
  });

  ReactDOM.render(
    <ApolloProvider client={client}>
    <App />  
    </ApolloProvider>,
    document.getElementById('root'),
  );