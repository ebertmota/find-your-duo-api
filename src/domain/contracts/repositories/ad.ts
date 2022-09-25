import { Ad } from '@/domain/entities';

export namespace ListAllAds {
  export type Output = Ad[];
}

export interface ListAllAds {
  listAds(): Promise<ListAllAds.Output>;
}

export namespace GetAdDiscord {
  export type Input = {
    id: string;
  };

  export type Output = {
    discord: string;
  } | null;
}

export interface GetAdDiscord {
  getDiscord(input: GetAdDiscord.Input): Promise<GetAdDiscord.Output>;
}
