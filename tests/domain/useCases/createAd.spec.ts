import { CreateAd, setupCreateAd } from '@/domain/useCases';
import { CreateAd as AdRepo } from '@/domain/contracts/repositories';
import { mock, MockProxy } from 'jest-mock-extended';
import { Ad } from '@/domain/entities';
import { createFakeAd } from '@/tests/helpers/mocks/entities';
import { mocked } from 'jest-mock';

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

jest.mock('@/domain/entities/ad');

describe('CreateAdUseCase', () => {
  let createdAd: Ad;
  let adRepo: MockProxy<AdRepo>;
  let sutInput: Input;
  let sut: CreateAd;

  beforeAll(() => {
    createdAd = createFakeAd();
    adRepo = mock();
    adRepo.create.mockResolvedValue(createdAd);
    sutInput = {
      discord: 'any_discord',
      gameId: 'any_gameId',
      hourEnd: 'any_hourEnd',
      hourStart: 'any_hourStart',
      name: 'any_name',
      weekDays: ['any_weekDay'],
      yearsPlaying: 1,
      useVoiceChannel: true,
    };
  });

  beforeEach(() => {
    sut = setupCreateAd(adRepo);
  });

  it('should call AdRepository create with correct input', async () => {
    await sut(sutInput);

    expect(mocked(Ad)).toHaveBeenCalledWith({
      gameId: sutInput.gameId,
      name: sutInput.name,
      yearsPlaying: sutInput.yearsPlaying,
      discord: sutInput.discord,
      weekDays: sutInput.weekDays,
      useVoiceChannel: sutInput.useVoiceChannel,
      hourStart: sutInput.hourStart,
      hourEnd: sutInput.hourEnd,
    });
    expect(adRepo.create).toHaveBeenCalledWith(mocked(Ad).mock.instances[0]);
    expect(adRepo.create).toHaveBeenCalledTimes(1);
  });

  it('should rethrow if AdRepository create throws', async () => {
    const error = new Error('repository fails');
    adRepo.create.mockRejectedValueOnce(error);

    const promise = sut(sutInput);

    expect(promise).rejects.toThrow(error);
  });

  it('should return created ad on success', async () => {
    const result = await sut(sutInput);

    expect(result).toEqual(createdAd);
  });
});
