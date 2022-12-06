import { ListGameAds } from '@/domain/useCases';
import { ok } from '../helpers';
import { HttpResponse } from '../protocols';
import { Controller } from './controller';

type Input = {
  gameId: string;
};

export class ListGameAdsController extends Controller {
  constructor(private readonly listGameAds: ListGameAds) {
    super();
  }

  async perform({ gameId }: Input): Promise<HttpResponse> {
    const ads = await this.listGameAds({
      gameId,
    });

    return ok(ads);
  }
}
