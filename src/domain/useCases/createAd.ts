import { CreateAd as AdRepo } from '../contracts/repositories';
import { Ad } from '../entities';

type Input = {
  gameId: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel?: boolean;
};
type Output = Ad;

export type CreateAd = (input: Input) => Promise<Output>;
type Setup = (adRepo: AdRepo) => CreateAd;

export const setupCreateAd: Setup = adRepo => async input => {
  const {
    gameId,
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel,
  } = input;

  const data = new Ad({
    gameId,
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel,
  });

  const createdAd = await adRepo.create(data);
  return createdAd;
};
