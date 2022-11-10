import { Game } from '@/domain/entities';
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
