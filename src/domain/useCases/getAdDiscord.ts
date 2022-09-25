import { GetAdDiscord as GetAdDiscordRepo } from '@/domain/contracts/repositories';

type Input = {
  id: string;
};

type Output = {
  discord: string;
} | null;

export type GetAdDiscord = (input: Input) => Promise<Output>;
type Setup = (adsRepo: GetAdDiscordRepo) => GetAdDiscord;

export const setupGetAdDiscord: Setup =
  adsRepo =>
  async ({ id }) => {
    const result = await adsRepo.getDiscord({
      id,
    });

    return result;
  };
