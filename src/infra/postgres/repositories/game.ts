import { FindGamesWithAdsCount } from '@/domain/contracts/repositories';
import { PgRepository } from './repository';

export class PgGameRepository
  extends PgRepository
  implements FindGamesWithAdsCount
{
  async findGamesWithAdsCount(): Promise<FindGamesWithAdsCount.Output> {
    const { game: gameRepository } = this.getRepository();
    const games = await gameRepository.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });

    return games;
  }
}
