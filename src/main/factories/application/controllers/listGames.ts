import { ListGamesController } from '@/application/controllers';
import { makeListGames } from '../../domain/useCases';

export const makeListGamesController = (): ListGamesController => {
  return new ListGamesController(makeListGames());
};
