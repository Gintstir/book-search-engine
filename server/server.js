const path = require('path');
const express = require('express');

//import Apollo server
const { ApolloServer } = require('apollo-server-express');
//import typeDefs and resolvers
const {typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//create new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//integrate our Apollo server with Express application as middleware
server.applyMiddleware({ app });

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// a wildcard GET route for the server.  If we make a GET request to any location on the server
// that doesnt have an explicit route defined, respond with the production ready React front end
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => {console.log(`🌍 Now listening on localhost:${PORT}`));
// });
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 API server running on port ${PORT}!`);
    //log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
  });
});