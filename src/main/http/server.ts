/* eslint-disable no-console */
import './config/module-alias';
import { PgConnection } from '@/infra/postgres/helpers';
import { env } from '@/main/helpers';
import { serveSwaggerDocs } from '@/main/http/config/swagger';

PgConnection.getInstance()
  .connect()
  .then(async () => {
    const { app } = await import('@/main/http/config/app');
    serveSwaggerDocs();
    app.listen(env.appPort, () =>
      console.log(`Sever running at http://localhost:${env.appPort}`),
    );
  })
  .catch(console.error);
