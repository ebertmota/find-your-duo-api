import { ListAds, setupListAds } from '@/domain/useCases';
import { ListAllAds } from '@/domain/contracts/repositories';
import { mock, MockProxy } from 'jest-mock-extended';
import { Ad } from '@/domain/entities';
import { mocked } from 'jest-mock';
import { createFakeAd } from '../../helpers/mocks/entities';

jest.mock('@/domain/entities/ad');

describe('ListAdsUseCase', () => {
  let adsRepository: MockProxy<ListAllAds>;
  let ads: Ad[];
  let sut: ListAds;

  beforeAll(() => {
    ads = [createFakeAd(), createFakeAd()];
    adsRepository = mock();
    adsRepository.listAll.mockResolvedValue(ads);
  });

  beforeEach(() => {
    sut = setupListAds(adsRepository);
  });

  it('should call AdsRepository listAll', async () => {
    await sut();

    expect(adsRepository.listAll).toHaveBeenCalledTimes(1);
  });

  it('should rethrow if AdsRepository listAds throws', async () => {
    const error = new Error('repository fails');
    adsRepository.listAll.mockRejectedValueOnce(error);

    const promise = sut();

    expect(promise).rejects.toThrow(error);
  });

  it('should return formatted ads', async () => {
    const result = await sut();

    expect(result).toEqual([
      mocked(Ad).mock.instances[0],
      mocked(Ad).mock.instances[1],
    ]);
    expect(Ad.format).toHaveBeenCalledTimes(2);
  });
});
