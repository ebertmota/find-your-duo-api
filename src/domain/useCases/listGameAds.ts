import { FindManyByGame } from '../contracts/repositories';
import { convertMinutesToHourString } from '../utils';

type Input = {
  gameId: string;
};
type FormattedAd = {
  id: string;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  name: string;
  yearsPlaying: number;
  useVoiceChannel: boolean;
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
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    });

    return formattedAds;
  };
