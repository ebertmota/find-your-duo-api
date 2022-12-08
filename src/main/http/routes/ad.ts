import { Router } from 'express';
import { adaptExpressRoute as adaptRoute } from '@/main/adapters';
import {
  makeListAdsController,
  makeShowAdDiscordController,
} from '@/main/factories/application/controllers';
import { checkSchema } from 'express-validator';

export default (router: Router): void => {
  router.get('/ads', adaptRoute(makeListAdsController()));
  router.get(
    '/ads/:id/discord',
    checkSchema({
      id: {
        in: 'params',
        isString: true,
      },
    }),
    adaptRoute(makeShowAdDiscordController()),
  );
};
