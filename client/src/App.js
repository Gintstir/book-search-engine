import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

//with this code we establish a new connection to the GraphQl server using Apollo.  
//uri: 'http://localhost:3001/graphql we used the absolute path before to test the route 
//but we can't use that in production.

//with this request config we use the .setContext() method to set the HTTP request headers of ecery request
//to include the toke, whether ther request needs it or not.  If thie request doesnt need the toke, our
//server side resolber function wont check for it
const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
            <Switch>
              <Route exact path='/' component={SearchBooks} />
              <Route exact path='/saved' component={SavedBooks} />
              <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
            </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
