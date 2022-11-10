import { createGame, createAd, Postgres } from '@/tests/helpers/postgres';
import { PgGameRepository } from '@/infra/postgres/repositories';

describe('PgGameRepository', () => {
  let sut: PgGameRepository;

  beforeAll(async () => {
    await Postgres.connect();
  });

  afterAll(async () => {
    await Postgres.disconnect();
  });

  beforeEach(() => {
    sut = new PgGameRepository();
  });

  afterEach(async () => {
    await Postgres.resetDatabase();
  });

  describe('findManyWithAdsCount', () => {
    it('should return empty array if no game was found', async () => {
      const result = await sut.findManyWithAdsCount();
      expect(result).toHaveLength(0);
    });

    it('should return games with ads count on success', async () => {
      const { game } = await createGame();
      await createAd({
        gameId: game.id,
      });
      await createAd({
        gameId: game.id,
      });

      const result = await sut.findManyWithAdsCount();

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('_count');
      // eslint-disable-next-line no-underscore-dangle
      expect(result[0]._count).toEqual({
        ads: 2,
      });
    });
  });
});
