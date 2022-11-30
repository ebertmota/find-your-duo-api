import { ListAdsController } from '@/application/controllers';
import { Ad } from '@prisma/client';
import { createFakeAd } from '../../helpers/mocks/entities';

describe('ListAdsController', () => {
  let ads: Ad[];
  let listAds: jest.Mock;
  let sut: ListAdsController;

  beforeAll(() => {
    ads = [createFakeAd()];
    listAds = jest.fn();
    listAds.mockResolvedValue(ads);
  });

  beforeEach(() => {
    sut = new ListAdsController(listAds);
  });

  it('should call ListAds', async () => {
    await sut.perform();

    expect(listAds).toHaveBeenCalledTimes(1);
  });

  it('should rethrow if ListAds throws', async () => {
    const error = new Error('useCase fails');
    listAds.mockRejectedValueOnce(error);

    const promise = sut.perform();

    expect(promise).rejects.toThrow(error);
  });

  it('should return 200 and ads on success', async () => {
    const result = await sut.perform();

    expect(result).toEqual({
      statusCode: 200,
      data: ads,
    });
  });
});
