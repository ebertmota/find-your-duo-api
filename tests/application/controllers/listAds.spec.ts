import { ListAdsController } from '@/application/controllers';
import { Ad } from '@prisma/client';
import { makeFakeAd } from '../../helpers/mocks/entities';

describe('ListAdsController', () => {
  let ads: Ad[];
  let listAds: jest.Mock;
  let sut: ListAdsController;

  beforeAll(() => {
    ads = [makeFakeAd()];
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

  it('should return ads on success', async () => {
    const result = await sut.perform();

    expect(result).toEqual({
      statusCode: 200,
      data: ads,
    });
  });
});
