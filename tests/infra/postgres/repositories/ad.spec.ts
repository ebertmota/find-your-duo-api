import { createGame, createAd, Postgres } from '@/tests/helpers/postgres';
import { CreateAd } from '@/domain/contracts/repositories';
import { PgAdRepository } from '@/infra/postgres/repositories';

describe('PgAdRepository', () => {
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

  describe('create', () => {
    let createAdData: Omit<CreateAd.Input, 'gameId'>;

    beforeAll(async () => {
      createAdData = {
        discord: 'any_discord',
        hourStart: 60,
        hourEnd: 60,
        name: 'any_name',
        useVoiceChannel: true,
        weekDays: 'any_weekDays',
        yearsPlaying: 10,
      };
    });

    it('should create ad in database', async () => {
      const { game } = await createGame();

      await sut.create({
        gameId: game.id,
        ...createAdData,
      });

      const listAds = await sut.getRepository().ad.findMany();
      expect(listAds).toHaveLength(1);
      expect(listAds[0].name).toEqual(createAdData.name);
    });

    it('should return created ad on success', async () => {
      const { game } = await createGame();

      const result = await sut.create({
        gameId: game.id,
        ...createAdData,
      });

      expect(result).toBeTruthy();
      expect(result).toHaveProperty('id');
    });
  });

  describe('listAll', () => {
    it('should return empty array if no ads exists', async () => {
      const result = await sut.listAll();

      expect(result).toEqual([]);
    });

    it('should return ads on success', async () => {
      const { ad } = await createAd();
      const { ad: otherAd } = await createAd();

      const result = await sut.listAll();

      expect(result).toHaveLength(2);
      expect(result[0].id).toEqual(ad.id);
      expect(result[1].id).toEqual(otherAd.id);
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
      const { ad } = await createAd();

      const result = await sut.getDiscord({
        id: ad.id,
      });

      expect(result).toEqual({ discord: ad.discord });
    });
  });

  describe('findManyByGame', () => {
    it('should return empty array if no ad was found for provided game', async () => {
      const { game } = await createGame();

      const result = await sut.findManyByGame({
        gameId: game.id,
      });

      expect(result).toHaveLength(0);
    });

    it('should not return ads with different game from provided', async () => {
      const { game } = await createGame();
      const { game: otherGame } = await createGame();
      await createAd({
        gameId: otherGame.id,
      });

      const result = await sut.findManyByGame({
        gameId: game.id,
      });

      expect(result).toHaveLength(0);
    });

    it('should return ads with provided game', async () => {
      const { game } = await createGame();
      const { ad: ad1 } = await createAd({
        gameId: game.id,
      });
      const { ad: ad2 } = await createAd({
        gameId: game.id,
      });

      const result = await sut.findManyByGame({
        gameId: game.id,
      });

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(ad2.id);
      expect(result[1].id).toBe(ad1.id);
      expect(result[0]).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          weekDays: expect.any(String),
          useVoiceChannel: expect.any(Boolean),
          yearsPlaying: expect.any(Number),
          hourStart: expect.any(Number),
          hourEnd: expect.any(Number),
        }),
      );
    });
  });
});
