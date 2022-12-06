import { CreateAd } from '@/domain/useCases';
import { created } from '../helpers';
import { HttpResponse } from '../protocols';
import { Controller } from './controller';

type Input = {
  gameId: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel?: boolean;
};

export class CreateAdController extends Controller {
  constructor(private readonly createAd: CreateAd) {
    super();
  }

  async perform(input: Input): Promise<HttpResponse> {
    const ad = await this.createAd(input);

    return created(ad);
  }
}
