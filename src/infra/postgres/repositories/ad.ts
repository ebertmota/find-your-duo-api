import {
  CreateAd,
  FindManyByGame,
  GetAdDiscord,
  ListAllAds,
} from '@/domain/contracts/repositories';
import { Ad } from '@/domain/entities';
import { PgRepository } from './repository';

export class PgAdRepository
  extends PgRepository
  implements ListAllAds, GetAdDiscord, CreateAd, FindManyByGame
{
  async create(input: CreateAd.Input): Promise<Ad> {
    const {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays,
      hourStart,
      hourEnd,
      useVoiceChannel,
    } = input;
    const { ad: adRepository } = this.getRepository();

    const ad = await adRepository.create({
      data: {
        gameId,
        name,
        yearsPlaying,
        discord,
        weekDays,
        hourStart,
        hourEnd,
        useVoiceChannel,
      },
    });

    return ad;
  }

  async listAll(): Promise<ListAllAds.Output> {
    const { ad: adRepository } = this.getRepository();
    return adRepository.findMany();
  }

  async getDiscord(input: GetAdDiscord.Input): Promise<GetAdDiscord.Output> {
    const { ad: adRepository } = this.getRepository();
    return adRepository.findUnique({
      where: {
        id: input.id,
      },
      select: {
        discord: true,
      },
    });
  }

  async findManyByGame({
    gameId,
  }: FindManyByGame.Input): Promise<FindManyByGame.Output> {
    const { ad: adRepository } = this.getRepository();
    return adRepository.findMany({
      where: {
        gameId,
      },
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
