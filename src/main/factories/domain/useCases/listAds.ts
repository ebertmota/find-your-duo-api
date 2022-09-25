import { ListAds, setupListAds } from '@/domain/useCases/listAds';
import { makePgAdRepository } from '../../infra/postgres/repositories';

export const makeListAds = (): ListAds => {
  return setupListAds(makePgAdRepository());
};
