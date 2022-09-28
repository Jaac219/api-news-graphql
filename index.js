require('./src/db.js');
const express = require('express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServer } = require('apollo-server-express')

const PORT = process.env.PORT || 4000;
const app = express();

const typeDefs = require('./src/merge/mergeSchemas.js');
const resolvers = require('./src/merge/mergeResolvers.js');

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