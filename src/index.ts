import "reflect-metadata";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";

import createSchema from "./schema";

// register 3rd party IOC container
TypeORM.useContainer(Container);

const bootstrap = async () => {
  try {
    // create TypeORM connection
    await TypeORM.createConnection();

    // build TypeGraphQL executable schema
    const schema = await createSchema(Container);

    const app = express();
    const corsConfig = {
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      credentials: true,
      origin: [/localhost*/],
    };
    app.use(cors(corsConfig));

    const port = 3000;

    // Create GraphQL server
    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      debug: true,
      playground: true,
    });
    server.applyMiddleware({ app, cors: corsConfig });

    app.listen({ port }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      );
    });
  } catch (err) {
    console.error(err);
  }
};

bootstrap();
