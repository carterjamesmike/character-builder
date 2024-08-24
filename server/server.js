const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const dotenv = require("dotenv");
const { typeDefs, resolvers } = require("./graphql");
const db = require("./config/connection");
const { verifyToken } = require("./utils/auth");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 3001;

async function startServer() {
  const app = express();
  const httpServer = require("http").createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: {
      settings: {
        'schema.polling.enable': false,
      },
    },
    context: ({ req }) => {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.split(" ")[1];
      let userID = null;
      
      if (token) {
        const decoded = verifyToken(token);
        if (decoded) {
          userID = decoded.userID;
        }
      }

      return { userID };
    },
  });

  await server.start();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  server.applyMiddleware({ app, path: "/graphql" });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  } else {
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
  }

  await new Promise(resolve => db.once("open", resolve));
  console.log("Connected to the database");

  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 GraphQL Playground available at http://localhost:${PORT}/graphql`
  );
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});