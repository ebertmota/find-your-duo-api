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
  findManyWithAdsCount: (
    input: FindGamesWithAdsCount.Input,
  ) => Promise<FindGamesWithAdsCount.Output>;
}
