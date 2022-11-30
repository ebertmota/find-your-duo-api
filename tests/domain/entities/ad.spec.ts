import { Ad, CreateAd } from '@/domain/entities';

describe('Ad', () => {
  let createAdData: CreateAd;

  beforeAll(() => {
    createAdData = {
      discord: 'any_discord',
      gameId: 'any_game_id',
      hourEnd: '12:00',
      hourStart: '13:00',
      name: 'any_name',
      weekDays: ['1', '2'],
      yearsPlaying: 1,
      useVoiceChannel: true,
    };
  });

  describe('constructor', () => {
    it('should create ad with correct and formatted data', () => {
      const result = new Ad(createAdData);

      expect(result).toEqual({
        discord: createAdData.discord,
        gameId: createAdData.gameId,
        hourEnd: 720,
        hourStart: 780,
        name: createAdData.name,
        weekDays: '1,2',
        yearsPlaying: createAdData.yearsPlaying,
        useVoiceChannel: createAdData.useVoiceChannel,
      });
    });

    it('should create ad with default useVoiceChannel if is not provided', () => {
      const result = new Ad({
        ...createAdData,
        useVoiceChannel: undefined,
      });

      expect(result.useVoiceChannel).toBe(false);
    });
  });

  describe('format', () => {
    it('should return ad with formatted hourStart and hourEnd', () => {
      const hourStart = '09:00';
      const hourEnd = '18:00';

      const ad = new Ad({
        discord: 'discord3782',
        gameId: 'randomGameId',
        name: 'any_name',
        yearsPlaying: 21,
        useVoiceChannel: true,
        weekDays: ['monday', 'friday'],
        hourStart,
        hourEnd,
      });

      const result = Ad.format(ad);

      expect(result.hourStart).toEqual(hourStart);
      expect(result.hourEnd).toEqual(hourEnd);
    });

    it('should return ad with formatted weekDays', () => {
      const weekDays = ['monday', 'friday'];

      const ad = new Ad({
        discord: 'discord3782',
        gameId: 'randomGameId',
        name: 'any_name',
        yearsPlaying: 21,
        useVoiceChannel: true,
        weekDays,
        hourStart: '10:00',
        hourEnd: '12:00',
      });

      const result = Ad.format(ad);

      expect(result.weekDays).toEqual(weekDays);
    });
  });
});
