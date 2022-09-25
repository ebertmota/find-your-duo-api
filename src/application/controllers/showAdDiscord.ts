import { AdNotFoundError } from '@/domain/entities/errors';
import { GetAdDiscord } from '@/domain/useCases';
import { badRequest, HttpResponse, ok } from '../helpers';
import { Controller } from './controller';

type Input = {
  id: string;
};

type Output =
  | {
      discord: string;
    }
  | Error;

export class ShowAdDiscordController extends Controller {
  constructor(private readonly getAdDiscord: GetAdDiscord) {
    super();
  }

  async perform(input: Input): Promise<HttpResponse<Output>> {
    const { id } = input;
    const result = await this.getAdDiscord({ id });

    if (!result) {
      return badRequest(new AdNotFoundError());
    }

    return ok(result);
  }
}
