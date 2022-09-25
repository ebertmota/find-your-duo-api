import { Modify } from '@/main/helpers';
import { ListAllAds } from '../contracts/repositories';
import { Ad } from '../entities';
import { convertMinutesToHourString } from '../utils';

type FormattedAd = Modify<
  Ad,
  {
    hourStart: string;
    hourEnd: string;
  }
>;

type Output = FormattedAd[];

export type ListAds = () => Promise<Output>;
type Setup = (adsRepo: ListAllAds) => ListAds;

export const setupListAds: Setup = adsRepo => async () => {
  const ads = await adsRepo.listAds();

  const formattedAds = ads.map(ad => {
    return {
      ...ad,
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    };
  });
  return formattedAds;
};
