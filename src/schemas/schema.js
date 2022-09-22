import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from '../resolvers/resolver.js';

const typeDefs = `
  type Query {
    hello: String
  }
`;

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})