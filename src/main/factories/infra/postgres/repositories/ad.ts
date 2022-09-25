import { PgAdRepository } from '@/infra/postgres/repositories';

export const makePgAdRepository = (): PgAdRepository => {
  return new PgAdRepository();
};
