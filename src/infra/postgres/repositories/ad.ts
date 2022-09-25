import { GetAdDiscord, ListAllAds } from '@/domain/contracts/repositories';
import { PgRepository } from './repository';

export class PgAdRepository
  extends PgRepository
  implements ListAllAds, GetAdDiscord
{
  async listAds(): Promise<ListAllAds.Output> {
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
}
