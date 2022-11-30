import { Ad, FormattedAd } from '@/domain/entities';
import { FindManyByGame } from '@/domain/contracts/repositories';

type Input = {
  gameId: string;
};
type Output = FormattedAd[];

export type ListGameAds = (input: Input) => Promise<Output>;
type Setup = (adRepo: FindManyByGame) => ListGameAds;

export const setupListGameAds: Setup =
  adRepo =>
  async ({ gameId }) => {
    const ads = await adRepo.findManyByGame({
      gameId,
    });

    const formattedAds = ads.map(ad => {
      return Ad.format(ad as Ad);
    });

    return formattedAds;
  };
