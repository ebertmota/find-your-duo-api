import { ListGameAds, setupListGameAds } from '@/domain/useCases';
import { FindManyByGame } from '@/domain/contracts/repositories';
import { mock, MockProxy } from 'jest-mock-extended';
import { Ad } from '@/domain/entities';
import { mocked } from 'jest-mock';
import { createFakeAd } from '../../helpers/mocks/entities';

jest.mock('@/domain/entities/ad');

describe('ListGameAdsUseCase', () => {
  let ads: Ad[];
  let adRepo: MockProxy<FindManyByGame>;
  let sutInput: { gameId: string };
  let sut: ListGameAds;

  beforeAll(() => {
    ads = [createFakeAd(), createFakeAd()];
    adRepo = mock();
    adRepo.findManyByGame.mockResolvedValue(ads);
    sutInput = {
      gameId: 'any_gameId',
    };
  });

  beforeEach(() => {
    sut = setupListGameAds(adRepo);
  });

  it('should call AdRepository findManyByGame with correct input', async () => {
    await sut(sutInput);

    expect(adRepo.findManyByGame).toHaveBeenCalledWith({
      gameId: sutInput.gameId,
    });
    expect(adRepo.findManyByGame).toHaveBeenCalledTimes(1);
  });

  it('should rethrow if AdRepository findManyByGame throws', async () => {
    const error = new Error('repository fails');
    adRepo.findManyByGame.mockRejectedValueOnce(error);

    const promise = sut(sutInput);
    expect(promise).rejects.toThrow(error);
  });

  it('should return formatted ads on success', async () => {
    const result = await sut(sutInput);

    expect(result).toEqual([
      mocked(Ad).mock.instances[0],
      mocked(Ad).mock.instances[1],
    ]);
    expect(Ad.format).toHaveBeenCalledTimes(2);
  });
});
