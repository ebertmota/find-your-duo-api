import { Ad } from '@/domain/entities';
import { Postgres } from '../../postgres';
import { createGame } from './game';

export const makeFakeAd = (): Ad => ({
  id: 'any_id',
  discord: 'any_discord',
  gameId: 'any_gameId',
  hourEnd: 60,
  hourStart: 60,
  name: 'any_name',
  useVoiceChannel: true,
  weekDays: 'any_week_days',
  yearsPlaying: 0,
  createdAt: new Date(),
});

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
    const game = await createGame();
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
