import { CreateAd, setupCreateAd } from '@/domain/useCases';
import { CreateAd as AdRepo } from '@/domain/contracts/repositories';
import { mock, MockProxy } from 'jest-mock-extended';
import { Ad } from '@/domain/entities';
import { createFakeAd } from '@/tests/helpers/mocks/entities';

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

describe('CreateAd useCase', () => {
  let createdAd: Ad;
  let adRepository: MockProxy<AdRepo>;
  let sutInput: Input;
  let sut: CreateAd;

  beforeAll(() => {
    createdAd = createFakeAd();
    adRepository = mock();
    adRepository.create.mockResolvedValue(createdAd);
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
    sut = setupCreateAd(adRepository);
  });

  it('should call AdRepository create with correct input', async () => {
    await sut(sutInput);

    expect(adRepository.create).toHaveBeenCalledWith({
      gameId: sutInput.gameId,
      name: sutInput.name,
      yearsPlaying: sutInput.yearsPlaying,
      discord: sutInput.discord,
      weekDays: sutInput.weekDays[0],
      useVoiceChannel: sutInput.useVoiceChannel,
      hourStart: expect.any(Number),
      hourEnd: expect.any(Number),
    });
    expect(adRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should return created ad on success', async () => {
    const result = await sut(sutInput);

    expect(result).toEqual(createdAd);
  });
});
