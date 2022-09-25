import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const games = [
  {
    title: 'League of Legends',
    bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg'
  },
  {
    title: 'Dota 2',
    bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/29595-285x380.jpg'
  },
  {
    title: 'Lost Ark',
    bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/490100-285x380.jpg'
  },
  {
    title: 'Apex Legends',
    bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/511224-285x380.jpg'
  },
  {
    title: 'Genshin Impact',
    bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/513181-285x380.jpg'
  },
  {
    title: 'World of Warcraft',
    bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/18122-285x380.jpg'
  }
];

export const seedGames = async (): Promise<void> => {
  for await (const game of games) {
    await prisma.game.create({
      data: game
    })
  }
};
seedGames();

