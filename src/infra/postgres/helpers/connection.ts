import { PrismaClient } from '@prisma/client';
import { ConnectionNotFoundError } from './errors';

export class PgConnection {
  private static instance?: PgConnection;
  private connection?: PrismaClient;

  static getInstance(): PgConnection {
    if (PgConnection.instance === undefined)
      PgConnection.instance = new PgConnection();
    return PgConnection.instance;
  }

  async connect(): Promise<void> {
    if (this.connection === undefined) {
      this.connection = new PrismaClient();
      this.connection.$connect();
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
