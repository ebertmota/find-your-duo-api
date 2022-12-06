import { ListGames } from '@/domain/useCases';
import { ok } from '../helpers';
import { HttpResponse } from '../protocols';
import { Controller } from './controller';

export class ListGamesController extends Controller {
  constructor(private readonly listGames: ListGames) {
    super();
  }

  async perform(): Promise<HttpResponse> {
    const games = await this.listGames();

    return ok(games);
  }
}
