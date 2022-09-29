require('dotenv').config();
require('./src/db.js');

const express = require('express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServer } = require('apollo-server-express')

const PORT = process.env.PORT;
const app = express();

const typeDefs = require('./src/merge/mergeSchemas.js');
const resolvers = require('./src/merge/mergeResolvers.js');

app.get('/', (req, res) => {
  res.redirect(`http://localhost:${PORT}/graphql`);
});

async function start(){
  const schema = makeExecutableSchema({typeDefs, resolvers});
  const apolloServer =  new ApolloServer({schema});
  await apolloServer.start();
  apolloServer.applyMiddleware({app});
  app.listen(PORT, (req, res)=>{
    console.log(`Servidor en el puerto ${PORT} 🚀`);
  });
};

start();