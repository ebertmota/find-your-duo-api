import { Game } from '@/domain/entities';
import { Ad } from '@prisma/client';
import { Postgres } from './connection';

namespace CreateGame {
  export type Output = {
    game: Game;
  };
}

export const createGame = async (): Promise<CreateGame.Output> => {
  const connection = Postgres.getConnection();
  const game = await connection.game.create({
    data: {
      bannerUrl: 'any_bannerUrl',
      title: 'any_title',
    },
  });

  return {
    game,
  };
};

namespace CreateAd {
  export type Input = {
    gameId?: string;
  };

  export type Output = {
    ad: Ad;
  };
}

export const createAd = async (
  input: CreateAd.Input = {},
): Promise<CreateAd.Output> => {
  const { gameId } = input;
  const connection = Postgres.getConnection();

  let gameIdSource = gameId;

  if (!gameIdSource) {
    const { game } = await createGame();
    gameIdSource = game.id;
  }

  const ad = await connection.ad.create({
    data: {
      gameId: gameIdSource,
      discord: 'any_discord',
      hourEnd: 60,
      hourStart: 60,
      name: 'any_name',
      useVoiceChannel: true,
      weekDays: 'any_weekDays',
      yearsPlaying: 0,
    },
  });

  return { ad };
};
