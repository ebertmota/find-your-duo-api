import { ShowAdDiscordController } from '@/application/controllers';
import { makeGetAdDiscord } from '../../domain/useCases';

export const makeShowAdDiscordController = (): ShowAdDiscordController => {
  return new ShowAdDiscordController(makeGetAdDiscord());
};
