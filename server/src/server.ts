import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { routes } from './routes';

const app = express();

app.use(
  bodyParser.json({
    limit: '50mb',
  }),
);

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true,
  }),
);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('HTTP server running on localhost:3333!');
});
