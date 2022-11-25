import { ShowAdDiscordController } from '@/application/controllers';
import { Ad } from '@/domain/entities';
import { AdNotFoundError } from '@/domain/entities/errors';
import { createFakeAd } from '../../helpers/mocks/entities';

describe('ShowAdDiscordController', () => {
  let ad: Ad;
  let getAdDiscord: jest.Mock;
  let sutInput: { id: string };
  let sut: ShowAdDiscordController;

  beforeAll(() => {
    ad = createFakeAd();
    getAdDiscord = jest.fn();
    getAdDiscord.mockResolvedValue({ discord: ad.discord });
    sutInput = {
      id: 'any_id',
    };
  });

  beforeEach(() => {
    sut = new ShowAdDiscordController(getAdDiscord);
  });

  it('should call GetAdDiscord with correct input', async () => {
    await sut.perform(sutInput);

    expect(getAdDiscord).toHaveBeenCalledWith({
      id: sutInput.id,
    });
    expect(getAdDiscord).toHaveBeenCalledTimes(1);
  });

  it('should rethrow if GetAdDiscord throws', async () => {
    const error = new Error('useCase fails');
    getAdDiscord.mockRejectedValueOnce(error);

    const promise = sut.perform(sutInput);

    expect(promise).rejects.toThrow(error);
  });

  it('should return 400 if GetAdDiscord returns null', async () => {
    getAdDiscord.mockResolvedValueOnce(null);

    const result = await sut.perform(sutInput);

    expect(result).toEqual({
      statusCode: 400,
      data: new AdNotFoundError(),
    });
  });

  it('should return 200 with ad discord', async () => {
    const result = await sut.perform(sutInput);

    expect(result).toEqual({
      statusCode: 200,
      data: {
        discord: ad.discord,
      },
    });
  });
});
