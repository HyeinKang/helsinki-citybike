import express, { Request, Response } from "express";

import Debug from 'debug';
import cookieParser from 'cookie-parser'
import logger from 'morgan'

// const trendsRouter = require('./routes/trends')

// const debug = Debug("api:server");
const port = normalizePort(process.env.PORT || '3000');
const app = express()

app.set('port', port);
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(<express.ErrorRequestHandler>((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong!')
  next();
}));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
})

app.listen(port,()=>{
  console.log(`Server Started at Port, ${port}`)
})

// app.use('/api/trends', trendsRouter)

// module.exports = app


function normalizePort(val:string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
