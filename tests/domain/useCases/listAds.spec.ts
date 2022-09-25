import { ListAds, setupListAds } from '@/domain/useCases';
import { ListAllAds } from '@/domain/contracts/repositories';
import { mock, MockProxy } from 'jest-mock-extended';
import { Ad } from '@/domain/entities';
import { makeFakeAd } from '../../helpers/mocks/entities';

describe('ListAds useCase', () => {
  let adsRepository: MockProxy<ListAllAds>;
  let ads: Ad[];
  let sut: ListAds;

  beforeAll(() => {
    ads = [makeFakeAd()];
    adsRepository = mock();
    adsRepository.listAds.mockResolvedValue(ads);
  });

  beforeEach(() => {
    sut = setupListAds(adsRepository);
  });

  it('should call AdsRepository listAds', async () => {
    await sut();

    expect(adsRepository.listAds).toHaveBeenCalledTimes(1);
  });

  it('should rethrow if AdsRepository listAds throws', async () => {
    const error = new Error('repository fails');
    adsRepository.listAds.mockRejectedValueOnce(error);

    const promise = sut();

    expect(promise).rejects.toThrow(error);
  });

  it('should return ads with formatted hourStart', async () => {
    const result = await sut();

    expect(result[0].hourStart).toEqual('01:00');
  });

  it('should return ads with formatted hourEnd', async () => {
    const result = await sut();

    expect(result[0].hourEnd).toEqual('01:00');
  });
});
