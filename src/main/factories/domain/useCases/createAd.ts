import { CreateAd, setupCreateAd } from '@/domain/useCases';
import { makePgAdRepository } from '../../infra/postgres/repositories';

export const makeCreateAd = (): CreateAd => {
  return setupCreateAd(makePgAdRepository());
};
