import { Router } from 'express';
import { adaptExpressRoute as adaptRoute } from '../adapters';
import { makeListAdsController } from '../factories/application/controllers';

export default (router: Router): void => {
  router.get('/ads', adaptRoute(makeListAdsController()));

  // router.get('/ads/:id/discord', async (request, response) => {
  //   const ad = await prisma.ad.findUniqueOrThrow({
  //     where: {
  //       id: request.params.id,
  //     },
  //     select: {
  //       discord: true,
  //     },
  //   });

  //   return response.json({
  //     discord: ad.discord,
  //   });
  // });
};
