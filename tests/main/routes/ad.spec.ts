import { createAd, Postgres } from '@/tests/helpers/postgres';
import { httpRequest } from '../../helpers/http';

describe('Ad Routes', () => {
  beforeAll(async () => {
    await Postgres.connect();
  });

  afterAll(async () => {
    await Postgres.disconnect();
  });

  afterEach(async () => {
    await Postgres.resetDatabase();
  });

  describe('GET /ads', () => {
    it('should return 200 with ads', async () => {
      await createAd();
      const { status, body } = await httpRequest().get('/ads');

      expect(status).toBe(200);
      expect(body).toHaveLength(1);
    });
  });

  describe('GET /ads/:id/discord', () => {
    it('should return 200 with ads', async () => {
      const { ad } = await createAd();
      const { status, body } = await httpRequest().get(`/ads/${ad.id}/discord`);

      expect(status).toBe(200);
      expect(body).toBeTruthy();
    });
  });
});
