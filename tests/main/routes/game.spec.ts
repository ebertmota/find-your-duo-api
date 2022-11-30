import { createAd, createGame, Postgres } from '@/tests/helpers/postgres';
import { httpRequest } from '../../helpers/http';

describe('Game routes', () => {
  beforeAll(async () => {
    await Postgres.connect();
  });

  afterAll(async () => {
    await Postgres.disconnect();
  });

  afterEach(async () => {
    await Postgres.resetDatabase();
  });

  describe('GET /games', () => {
    it('should return 200 with games', async () => {
      await createGame();
      const { status, body } = await httpRequest().get('/games');

      expect(status).toBe(200);
      expect(body).toHaveLength(1);
    });
  });

  describe('POST /games/:id/ads', () => {
    it('should return 201 with created ad', async () => {
      const { game } = await createGame();
      const { status, body } = await httpRequest()
        .post(`/games/${game.id}/ads`)
        .send({
          gameId: game.id,
          name: 'Testing ad',
          yearsPlaying: 2,
          discord: 'testUser#4242',
          weekDays: ['m', 's'],
          hourStart: '09:00',
          hourEnd: '12:00',
          useVoiceChannel: true,
        });

      expect(status).toBe(201);
      expect(body).toHaveProperty('id');
    });
  });

  describe('GET /games/:id/ads', () => {
    it('should return 200 with game ads', async () => {
      const { game } = await createGame();
      await createAd({
        gameId: game.id,
      });
      const { status, body } = await httpRequest().get(`/games/${game.id}/ads`);

      expect(status).toBe(200);
      expect(body).toHaveLength(1);
    });
  });
});
