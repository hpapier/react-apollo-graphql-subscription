// Module imports.
const express = require('express');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const graphqlExpress = require('express-graphql');
const cors = require('cors');
const bodyParser = require('body-parser');

// Local imports.
const { PORT } = require('./config.js');
const { schema } = require('./schema.js');


// Initialize express server
const app = express();
app.use(cors());
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, graphiql: true }));


// Create a node server with the express server
const ws = createServer(app);


// Run the server
ws.listen(PORT, () => {
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },

    {
      server: ws,
      path: '/subscriptions'
    }
  );
});