import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schemas/schema.js';

const app = express();
app.use(express.json());

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema
}));

export default app;