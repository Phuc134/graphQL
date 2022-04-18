const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
//Load schema & resolvers
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");
const jwt = require("jsonwebtoken");
const getUser = (token) => {  
  if (token) {
    try {
      return jwt.verify(token, "1" );
    } catch (err) {
      return { error: true, msg: "Session invalid" };
    }
  }
};

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/graphQL");
    console.log("connect successfully.");
  } catch (error) {
    console.log(error);
  }
}
connect();
async function a(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
      // context: ( {req} ) => {
      //   if (req.body.query.match("login") || req.body.query.match('signUp')) return {};
      //   if (req.headers && req.headers.authorization) {
      //     var auth = req.headers.authorization || "";
      //     var parts = auth.split(" ");
      //     var bearer = parts[0];
      //     var token = parts[1];
      //     if (bearer == "Bearer") {
      //       const user = getUser(token);
      //       if (user.error) {
      //         return {error: user.msg};
      //       } else return {user };
      //     } else {
      //       throw Error("Authentication must use Bearer.");
      //     }
      //   } else {
      //     throw Error("User must be authenticated.");
      //   }
      // },
  });

  const app = express();
  await server.start();
  server.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
  return { server, app };
}

a(typeDefs, resolvers);
