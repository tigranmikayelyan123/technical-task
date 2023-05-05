import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();
import * as cors from 'cors';
import { AppDataSource } from './data-source';
import { userRoute, fileRoute } from './routes';

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/api/users', userRoute);
    app.use('/api/file', fileRoute);

    const port = process.env.PORT || 3001;

    app.listen(port);

    console.log(
      `Express server has started on port ${port}. Open http://localhost:${port}/api is the base url`
    );
  })
  .catch((error) => console.log(error));
