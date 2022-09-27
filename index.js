import './src/db.js';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';

const PORT = process.env.PORT || 4000;
const app = express();


import typeDefs from './src/merge/mergeSchemas.js';
import resolvers from './src/merge/mergeResolvers.js';

app.get('/', (req, res, next) => {
  res.send('Welcome');
});

async function start(){
  const schema = makeExecutableSchema({typeDefs, resolvers});
  const apolloServer =  new ApolloServer({schema});
  await apolloServer.start();
  apolloServer.applyMiddleware({app});
  app.listen(PORT, (req, res, next)=>{
    console.log(`Servidor en el puerto ${PORT} 🚀`);
  });
};

start();