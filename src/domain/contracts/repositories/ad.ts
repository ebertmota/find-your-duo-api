import { Ad } from '@/domain/entities';

export namespace ListAllAds {
  export type Output = Ad[];
}

export interface ListAllAds {
  listAll(): Promise<ListAllAds.Output>;
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

export namespace CreateAd {
  export type Input = {
    gameId: string;
    name: string;
    yearsPlaying: number;
    discord: string;
    weekDays: string;
    hourStart: number;
    hourEnd: number;
    useVoiceChannel: boolean;
  };

  export type Output = Ad;
}

export interface CreateAd {
  create(input: CreateAd.Input): Promise<CreateAd.Output>;
}

export namespace FindManyByGame {
  export type Input = {
    gameId: string;
  };

  export type Output = {
    name: string;
    yearsPlaying: number;
    weekDays: string;
    hourStart: number;
    hourEnd: number;
    useVoiceChannel: boolean;
    id: string;
  }[];
}

export interface FindManyByGame {
  findManyByGame(input: FindManyByGame.Input): Promise<FindManyByGame.Output>;
}
