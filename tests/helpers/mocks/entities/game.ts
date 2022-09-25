import { Game } from '@/domain/entities';
import { Postgres } from '../../postgres';

export const createGame = async (): Promise<Game> => {
  const connection = Postgres.getConnection();
  const game = await connection.game.create({
    data: {
      title: 'any_title',
      bannerUrl: 'any_bannerUrl',
    },
  });
  return game;
};
