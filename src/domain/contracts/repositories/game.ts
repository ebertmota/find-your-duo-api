import { Game } from '@/domain/entities';

export namespace FindGamesWithAdsCount {
  export type Input = void;

  type GameWithCount = Game & {
    _count: {
      ads: number;
    };
  };
  export type Output = GameWithCount[];
}

export interface FindGamesWithAdsCount {
  findGamesWithAdsCount: (
    input: FindGamesWithAdsCount.Input,
  ) => Promise<FindGamesWithAdsCount.Output>;
}
