import { createAd } from '@/../tests/helpers/mocks/entities';
import { Postgres } from '@/../tests/helpers/postgres';
import { PgAdRepository } from '@/infra/postgres/repositories';

describe('AdRepository', () => {
  let sut: PgAdRepository;

  beforeAll(async () => {
    await Postgres.connect();
  });

  afterAll(async () => {
    await Postgres.disconnect();
  });

  beforeEach(() => {
    sut = new PgAdRepository();
  });

  afterEach(async () => {
    await Postgres.resetDatabase();
  });

  describe('listAds', () => {
    it('should return empty array if no ads exists', async () => {
      const result = await sut.listAds();

      expect(result).toEqual([]);
    });

    it('should return ads on success', async () => {
      const ad = await createAd();
      const otherAd = await createAd();

      const result = await sut.listAds();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(ad);
      expect(result[1]).toEqual(otherAd);
    });
  });

  describe('getDiscord', () => {
    it('should return null if ad not exists', async () => {
      const result = await sut.getDiscord({
        id: 'any_id',
      });

      expect(result).toBe(null);
    });

    it('should return ad discord on success', async () => {
      const ad = await createAd();

      const result = await sut.getDiscord({
        id: ad.id,
      });

      expect(result).toEqual({ discord: ad.discord });
    });
  });
});
