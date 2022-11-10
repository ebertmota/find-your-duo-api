import { CreateAd as AdRepo } from '../contracts/repositories';
import { Ad } from '../entities';
import { convertHourStringToMinutes } from '../utils';

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
  const ad = await adRepo.create({
    gameId,
    name,
    yearsPlaying,
    discord,
    weekDays: weekDays.join(','),
    hourStart: convertHourStringToMinutes(hourStart),
    hourEnd: convertHourStringToMinutes(hourEnd),
    useVoiceChannel: useVoiceChannel || false,
  });
  return ad;
};
