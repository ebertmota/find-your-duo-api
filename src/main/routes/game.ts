import { Router } from 'express';

export default (router: Router): void => {
  // router.get('/games', async (request, response) => {
  //   const games = await prisma.game.findMany({
  //     include: {
  //       _count: {
  //         select: {
  //           ads: true,
  //         },
  //       },
  //     },
  //   });
  //   return response.json(games);
  // });
  // router.post('/games/:id/ads', async (request, response) => {
  //   const {
  //     name,
  //     yearsPlaying,
  //     discord,
  //     weekDays,
  //     hourStart,
  //     hourEnd,
  //     useVoiceChannel,
  //   } = request.body;
  //   const game = await prisma.ad.create({
  //     data: {
  //       gameId: request.params.id,
  //       name,
  //       yearsPlaying,
  //       discord,
  //       weekDays: weekDays.join(','),
  //       hourStart: convertHourStringToMinutes(hourStart),
  //       hourEnd: convertHourStringToMinutes(hourEnd),
  //       useVoiceChannel,
  //     },
  //   });
  //   return response.status(201).json(game);
  // });
  // router.get('/games/:id/ads', async (request, response) => {
  //   const ads = await prisma.ad.findMany({
  //     where: {
  //       gameId: request.params.id,
  //     },
  //     select: {
  //       id: true,
  //       name: true,
  //       weekDays: true,
  //       useVoiceChannel: true,
  //       yearsPlaying: true,
  //       hourStart: true,
  //       hourEnd: true,
  //     },
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //   });
  //   const formattedAds = ads.map(ad => {
  //     return {
  //       ...ad,
  //       weekDays: ad.weekDays.split(','),
  //       hourStart: convertMinutesToHourString(ad.hourStart),
  //       hourEnd: convertMinutesToHourString(ad.hourEnd),
  //     };
  //   });
  //   return response.json(formattedAds);
  // });
};
