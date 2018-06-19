import { GraphQLServer } from 'graphql-yoga'
import {Prisma} from './generated/prisma'
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import AuthPayload from './resolvers/AuthPayload';
import Subscription from './resolvers/Subscription';

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Subscription,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      endpoint: 'https://us1.prisma.sh/public-chattersamurai-676/backend/dev', // the endpoint of the Prisma API
      debug: true, // log all GraphQL queries & mutations sent to the Prisma API
      // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
    }),
  }),
});

server.start(() => console.log('Server is running on http://localhost:4000'));
