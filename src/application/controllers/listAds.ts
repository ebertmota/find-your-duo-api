import { ListAds } from '@/domain/useCases';
import { ok } from '../helpers';
import { HttpResponse } from '../protocols';
import { Controller } from './controller';

export class ListAdsController extends Controller {
  constructor(private readonly listAds: ListAds) {
    super();
  }

  async perform(): Promise<HttpResponse> {
    const ads = await this.listAds();

    return ok(ads);
  }
}
