import { app } from '@/main/config/app';
import request, { SuperTest } from 'supertest';

export const httpRequest = (): SuperTest<request.Test> => {
  return request(app);
};
