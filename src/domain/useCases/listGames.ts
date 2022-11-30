import { FindGamesWithAdsCount } from '../contracts/repositories';
import { Game } from '../entities';

type GameWithAdsCount = Game & {
  count: {
    ads: number;
  };
};

export type ListGames = () => Promise<GameWithAdsCount[]>;
type Setup = (gamesRepo: FindGamesWithAdsCount) => ListGames;

export const setupListGames: Setup = gamesRepo => async () => {
  const games = await gamesRepo.findManyWithAdsCount();

  const formattedGames = games.map(game => ({
    ...game,
    _count: undefined,
    count: game._count,
  }));

  return formattedGames;
};
