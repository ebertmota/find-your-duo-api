import { GetAdDiscord, setupGetAdDiscord } from '@/domain/useCases';
import { makePgAdRepository } from '../../infra/postgres/repositories';

export const makeGetAdDiscord = (): GetAdDiscord => {
  return setupGetAdDiscord(makePgAdRepository());
};
