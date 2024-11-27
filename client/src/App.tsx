// import './App.css';
// import { Outlet } from 'react-router-dom';

// import Navbar from './components/Navbar';

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//     </>
//   );
// }

// export default App;

import {
    createHttpLink,
  } from '@apollo/client';
  
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

const httpLink = createHttpLink({
    uri: '/graphql',
  });
  

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    uri: '/graphql', // Ensure this matches your server's GraphQL endpoint
    cache: new InMemoryCache(),

});

const App = () => (
    <ApolloProvider client={client}>
        <>
            <Navbar />
            <Outlet />
        </>
    </ApolloProvider>
);

export default App;
