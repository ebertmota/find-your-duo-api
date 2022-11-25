import { GetAdDiscord, setupGetAdDiscord } from '@/domain/useCases';
import { GetAdDiscord as GetAdDiscordRepo } from '@/domain/contracts/repositories';
import { mock, MockProxy } from 'jest-mock-extended';
import { Ad } from '@/domain/entities';
import { createFakeAd } from '../../helpers/mocks/entities';

describe('GetAdDiscord useCase', () => {
  let ad: Ad;
  let adsRepository: MockProxy<GetAdDiscordRepo>;
  let sutInput: { id: string };
  let sut: GetAdDiscord;

  beforeAll(() => {
    ad = createFakeAd();
    adsRepository = mock();
    adsRepository.getDiscord.mockResolvedValue({
      discord: ad.discord,
    });
    sutInput = {
      id: 'any_id',
    };
  });

  beforeEach(() => {
    sut = setupGetAdDiscord(adsRepository);
  });

  it('should call AdsRepository getDiscord with correct input', async () => {
    await sut(sutInput);

    expect(adsRepository.getDiscord).toHaveBeenCalledWith({
      id: sutInput.id,
    });
    expect(adsRepository.getDiscord).toHaveBeenCalledTimes(1);
  });

  it('should rethrow if AdsRepository getDiscord throws', async () => {
    const error = new Error('repository fails');
    adsRepository.getDiscord.mockRejectedValueOnce(error);

    const promise = sut(sutInput);

    expect(promise).rejects.toThrow(error);
  });

  it('should return null if AdsRepository getDiscord returns null', async () => {
    adsRepository.getDiscord.mockResolvedValueOnce(null);

    const result = await sut(sutInput);

    expect(result).toEqual(null);
  });

  it('should return ad discord on success', async () => {
    const result = await sut(sutInput);

    expect(result).toEqual({
      discord: ad.discord,
    });
  });
});
