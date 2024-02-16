const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const app = express();
const rateLimits={};
const MAX_LIMIT=10;
const WindowMs=10*60*1000;

function rateLimiter(req,res,next){
    const now=Date.now();
    // console.log(now);
    const ip=req.ip;
    if(!rateLimits[ip]){
        rateLimits[ip]={
       request:1,
       startTime:now
        }
        return next();
    }

    const deltaTime=Date.now()-rateLimits[ip].startTime ;
    if(WindowMs>deltaTime){
        rateLimits[ip].request++;
        if(rateLimits[ip].request > MAX_LIMIT){
            const response={
                msg:"Limit exceeds",
                statusCode:res.statusCode
            }
            return res.status(429).json(response);
        }
        return next();
    }


    rateLimits[ip]={
        request:1,
        startTime:Date.now()
         }


         return next();



}
app.use(rateLimiter);


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
