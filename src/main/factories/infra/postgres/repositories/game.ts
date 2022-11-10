import { PgGameRepository } from '@/infra/postgres/repositories';

export const makePgGameRepository = (): PgGameRepository => {
  return new PgGameRepository();
};
