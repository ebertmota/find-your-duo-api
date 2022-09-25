/* eslint-disable no-console */
import { app } from './config/app';
import './config/module-alias';
import { env } from './helpers';

app.listen(env.appPort, () =>
  console.log(`Sever running at http://localhost:${env.appPort}`),
);
