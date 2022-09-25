import { PgGameRepository } from '@/infra/postgres/repositories';

describe('GameRepository', () => {
  let sut: PgGameRepository;

  beforeEach(() => {
    sut = new PgGameRepository();
  });

  it('should work', async () => {
    expect(1 + 1).toBe(2);
  });
});
