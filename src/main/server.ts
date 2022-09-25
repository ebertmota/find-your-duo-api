/* eslint-disable no-console */
import './config/module-alias';
import { PgConnection } from '@/infra/postgres/helpers';
import { env } from './helpers';

PgConnection.getInstance()
  .connect()
  .then(async () => {
    const { app } = await import('@/main/config/app');
    app.listen(env.appPort, () =>
      console.log(`Sever running at http://localhost:${env.appPort}`),
    );
  });
