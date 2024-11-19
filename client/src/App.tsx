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



import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

const client = new ApolloClient({
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
