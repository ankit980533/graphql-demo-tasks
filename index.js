const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const app = express();
app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: { user: req.user },
  }))
);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on 3000`);
});
