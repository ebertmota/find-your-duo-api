import { env } from './env';

export enum NodeEnv {
  dev = 'development',
  test = 'test',
  prod = 'production',
}

export const inProdEnvironment = env.node === NodeEnv.prod;
export const inDevEnvironment = env.node === NodeEnv.dev;
export const inTestEnvironment = env.node === NodeEnv.test;
