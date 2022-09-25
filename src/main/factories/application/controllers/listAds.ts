import { ListAdsController } from '@/application/controllers';
import { makeListAds } from '../../domain/useCases';

export const makeListAdsController = (): ListAdsController => {
  return new ListAdsController(makeListAds());
};
