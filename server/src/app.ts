import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import { middleware } from './middlewares';
import { routers } from './routes';
import { ServerSocket } from './socket';

const app: Application = express();
const PORT = 3001;
const ENV = process.env.NODE_ENV || 'development';

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log(__dirname);

app.use(express.static(`${__dirname}../../../client/build`));

app.set('trust proxy', true);
app.disable('x-powered-by');

/* Middlewares */
app.use(middleware.local);
app.use(middleware.ip);
app.use(middleware.logger);

/* routes */
app.use('/', routers.home)
app.use('/admin', routers.admin);
app.use('/jury', routers.jury);

/* errors */
app.use(routers.errors[404]);
app.use(routers.errors[500]);


const server = app.listen(PORT, () => {
  console.log(`Started in ${ENV} environement`);
  console.log(`Server listening on http://localhost:${PORT}`);

});
new ServerSocket(server);