import { ListGameAdsController } from '@/application/controllers';
import { makeListGameAds } from '../../domain/useCases';

export const makeListGameAdsController = (): ListGameAdsController => {
  return new ListGameAdsController(makeListGameAds());
};
