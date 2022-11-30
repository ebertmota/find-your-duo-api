import { ListGameAdsController } from '@/application/controllers';
import { FormattedAd } from '@/domain/entities';
import { createFakeFormattedAd } from '../../helpers/mocks/entities';

describe('ListGameAdsController', () => {
  let ads: FormattedAd[];
  let listGameAds: jest.Mock;
  let sutInput: { gameId: string };
  let sut: ListGameAdsController;

  beforeAll(() => {
    ads = [createFakeFormattedAd()];
    listGameAds = jest.fn();
    listGameAds.mockResolvedValue(ads);
    sutInput = {
      gameId: 'any_gameId',
    };
  });

  beforeEach(() => {
    sut = new ListGameAdsController(listGameAds);
  });

  it('should call ListGameAds with correct input', async () => {
    await sut.perform(sutInput);

    expect(listGameAds).toHaveBeenCalledWith({
      gameId: sutInput.gameId,
    });
    expect(listGameAds).toHaveBeenCalledTimes(1);
  });

  it('should rethrow if ListGameAds throws', async () => {
    const error = new Error('useCase fails');
    listGameAds.mockRejectedValueOnce(error);

    const promise = sut.perform(sutInput);

    expect(promise).rejects.toThrow(error);
  });

  it('should return 200 with ads on success', async () => {
    const result = await sut.perform(sutInput);

    expect(result).toEqual({
      statusCode: 200,
      data: ads,
    });
  });
});
