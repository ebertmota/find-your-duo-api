import { Ad } from '@/domain/entities';

export const createFakeAd = (): Ad => ({
  id: 'any_id',
  discord: 'any_discord',
  gameId: 'any_gameId',
  hourEnd: 60,
  hourStart: 60,
  name: 'any_name',
  useVoiceChannel: true,
  weekDays: 'any_week_days',
  yearsPlaying: 0,
  createdAt: new Date(),
});
