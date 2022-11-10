import { ListGames, setupListGames } from '@/domain/useCases';
import { makePgGameRepository } from '../../infra/postgres/repositories';

export const makeListGames = (): ListGames => {
  return setupListGames(makePgGameRepository());
};
