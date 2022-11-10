import { ListGameAds, setupListGameAds } from '@/domain/useCases';
import { makePgAdRepository } from '../../infra/postgres/repositories';

export const makeListGameAds = (): ListGameAds => {
  return setupListGameAds(makePgAdRepository());
};
