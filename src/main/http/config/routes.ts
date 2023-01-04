import { Express, Router } from 'express';
import { adRoutes, gameRoutes } from '@/main/http/routes';

export const setupRoutes = (app: Express): void => {
  const appRoutes = [adRoutes, gameRoutes];

  const router = Router();
  appRoutes.forEach(route => route(router));

  app.use(router);
};
