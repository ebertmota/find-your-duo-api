/* eslint-disable @typescript-eslint/no-empty-function */
import { env } from '@/main/helpers';
import { PrismaClient } from '@prisma/client';
import { URL } from 'url';
import { ConnectionNotFoundError } from './errors';

type GenerateDatabaseURLInput = {
  schema?: string;
};

export class PgConnection {
  private static instance?: PgConnection;
  private databaseUrl?: string;
  public connection?: PrismaClient;

  private constructor() {}

  static getInstance(): PgConnection {
    if (PgConnection.instance === undefined)
      PgConnection.instance = new PgConnection();
    return PgConnection.instance;
  }

  static generateDatabaseURL(input?: GenerateDatabaseURLInput): string {
    const { username, password, host, port, database } = env.postgres;
    const baseUrl = `postgresql://${username}:${password}@${host}:${port}/${database}`;

    const url = new URL(baseUrl);
    url.searchParams.append('schema', input?.schema || database);

    return url.toString();
  }

  async connect(): Promise<void> {
    this.databaseUrl = PgConnection.generateDatabaseURL();
    if (this.connection === undefined) {
      this.connection = new PrismaClient({
        datasources: {
          db: { url: this.databaseUrl },
        },
      });
      await this.connection.$connect();
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotFoundError();
    this.connection.$disconnect();
  }

  getRepository(): PrismaClient {
    if (this.connection === undefined) throw new ConnectionNotFoundError();
    return this.connection;
  }
}
