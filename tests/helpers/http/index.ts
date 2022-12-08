import { app } from '@/main/http/config/app';
import request, { SuperTest } from 'supertest';

export const httpRequest = (): SuperTest<request.Test> => {
  return request(app);
};
