import express, { Request, Response } from "express";

import cookieParser from 'cookie-parser'
import logger from 'morgan'

import { trendsRouter } from './routes/trendsRoutes'

const normalizePort = (val:string) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '3000');
const app = express()

app.set('port', port);
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.listen(port,()=>{
  console.log(`Server Started at Port, ${port}`)
})

app.use(<express.ErrorRequestHandler>((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong!')
  next();
}));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!")
})

app.use('/api/trends', trendsRouter)