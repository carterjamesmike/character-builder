const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const dotenv = require('dotenv');
const { typeDefs, resolvers } = require('./graphql');
const db = require('./config/connection');
const { authenticateToken } = require('./utils/auth');

dotenv.config();

const PORT = process.env.PORT || 3001;

async function startServer() {
  const app = express();
  const httpServer = require('http').createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // You can perform authentication here
      const token = req.headers.authorization || '';
      const user = authenticateToken(token);
      return { user };
    },
  });

  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Apply Apollo Server middleware
  server.applyMiddleware({ app, path: '/graphql' });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  } else {
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
  }

  // Connect to the database
  await db.once('open', () => {
    console.log('Connected to the database');
  });

  // Start the server
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});