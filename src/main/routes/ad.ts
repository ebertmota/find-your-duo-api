import { Router } from 'express';
import { adaptExpressRoute as adaptRoute } from '../adapters';
import {
  makeListAdsController,
  makeShowAdDiscordController,
} from '../factories/application/controllers';

export default (router: Router): void => {
  router.get('/ads', adaptRoute(makeListAdsController()));
  router.get('/ads/:id/discord', adaptRoute(makeShowAdDiscordController()));
};
