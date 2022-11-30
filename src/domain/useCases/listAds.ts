import { ListAllAds } from '../contracts/repositories';
import { Ad, FormattedAd } from '../entities';

type Output = FormattedAd[];

export type ListAds = () => Promise<Output>;
type Setup = (adsRepo: ListAllAds) => ListAds;

export const setupListAds: Setup = adsRepo => async () => {
  const ads = await adsRepo.listAll();

  const formattedAds = ads.map(ad => {
    return Ad.format(ad);
  });

  return formattedAds;
};
