import request from 'supertest';
import { app } from '@/main/config/app';
import { Postgres } from '@/tests/helpers/postgres';
import { createAd } from '../../helpers/mocks/entities';

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
      const { status, body } = await request(app).get('/ads');

      expect(status).toBe(200);
      expect(body).toHaveLength(1);
    });
  });
});
