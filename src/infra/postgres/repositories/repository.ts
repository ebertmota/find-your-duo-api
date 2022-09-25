import { PrismaClient } from '@prisma/client';
import { PgConnection } from '../helpers';

export abstract class PgRepository {
  constructor(
    private readonly connection: PgConnection = PgConnection.getInstance(),
  ) {}

  getRepository(): PrismaClient {
    return this.connection.getRepository();
  }
}
