import { CreateAdController } from '@/application/controllers';
import { Ad } from '@/domain/entities';
import { createFakeAd } from '../../helpers/mocks/entities';

type Input = {
  gameId: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel?: boolean;
};

describe('CreateAdController', () => {
  let ad: Ad;
  let createAd: jest.Mock;
  let sutInput: Input;
  let sut: CreateAdController;

  beforeAll(() => {
    ad = createFakeAd();
    createAd = jest.fn();
    createAd.mockResolvedValue(ad);
    sutInput = {
      discord: 'any_discord',
      gameId: 'any_gameId',
      hourEnd: 'any_hourEnd',
      hourStart: 'any_hourStart',
      name: 'any_name',
      weekDays: ['any_weekDay'],
      yearsPlaying: 0,
      useVoiceChannel: true,
    };
  });

  beforeEach(() => {
    sut = new CreateAdController(createAd);
  });

  it('should call CreateAd with correct input', async () => {
    await sut.perform(sutInput);

    expect(createAd).toHaveBeenCalledWith(sutInput);
    expect(createAd).toHaveBeenCalledTimes(1);
  });

  it('should rethrow if CreateAd throws', async () => {
    const error = new Error('useCase fails');
    createAd.mockRejectedValueOnce(error);

    const promise = sut.perform(sutInput);

    expect(promise).rejects.toThrow(error);
  });

  it('should return 201 with ad on success', async () => {
    const result = await sut.perform(sutInput);

    expect(result).toEqual({
      statusCode: 201,
      data: ad,
    });
  });
});
