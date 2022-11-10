import { CreateAdController } from '@/application/controllers';
import { makeCreateAd } from '../../domain/useCases';

export const makeCreateAdController = (): CreateAdController => {
  return new CreateAdController(makeCreateAd());
};
