import { Router } from 'express';
import { adaptExpressRoute as adaptRoute } from '../adapters';
import {
  makeCreateAdController,
  makeListAdsController,
  makeListGameAdsController,
} from '../factories/application/controllers';

export default (router: Router): void => {
  router.get('/games', adaptRoute(makeListAdsController()));
  router.post('/games/:id/ads', adaptRoute(makeCreateAdController()));
  router.get('/games/:id/ads', adaptRoute(makeListGameAdsController()));
};
