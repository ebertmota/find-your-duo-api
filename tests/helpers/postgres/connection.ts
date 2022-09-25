import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { join } from 'path';
import { execSync } from 'child_process';
import { PgConnection } from '@/infra/postgres/helpers';

const prismaBinary = join(
  __dirname,
  '..',
  '..',
  '..',
  'node_modules',
  '.bin',
  'prisma',
);

export const Postgres = {
  schema: null as unknown as string,
  databaseUrl: null as unknown as string,

  syncDatabaseWithPrismaSchema(): void {
    execSync(`${prismaBinary} db push`, {
      env: {
        ...process.env,
        DATABASE_URL: this.databaseUrl,
      },
    });
  },

  async connect(): Promise<void> {
    this.schema = `test-${randomUUID()}`;
    const url = PgConnection.generateDatabaseURL({
      schema: this.schema,
    });
    this.databaseUrl = url;

    PgConnection.getInstance().connection = new PrismaClient({
      datasources: { db: { url } },
    });
    await PgConnection.getInstance().connect();

    this.syncDatabaseWithPrismaSchema();
  },

  getConnection(): PrismaClient {
    const { connection } = PgConnection.getInstance();
    if (!connection) {
      throw new Error('Database is not connected');
    }

    return connection;
  },

  async clearDatabase(): Promise<void> {
    const connection = this.getConnection();
    await connection.$executeRawUnsafe(
      `DROP SCHEMA IF EXISTS "${this.schema}" CASCADE;`,
    );
  },

  async resetDatabase(): Promise<void> {
    await this.clearDatabase();
    this.syncDatabaseWithPrismaSchema();
  },

  async disconnect(): Promise<void> {
    const connection = this.getConnection();
    await this.clearDatabase();
    await connection.$disconnect();
  },
};
