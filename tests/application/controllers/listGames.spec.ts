import { ListGamesController } from '@/application/controllers';
import { Game } from '@/domain/entities';
import { createFakeGame } from '../../helpers/mocks/entities';

describe('ListGamesController', () => {
  let games: Game[];
  let listGames: jest.Mock;
  let sut: ListGamesController;

  beforeAll(() => {
    games = [createFakeGame()];
    listGames = jest.fn();
    listGames.mockResolvedValue(games);
  });

  beforeEach(() => {
    sut = new ListGamesController(listGames);
  });

  it('should call ListGames', async () => {
    await sut.perform();

    expect(listGames).toHaveBeenCalledTimes(1);
  });

  it('should rethrow if ListGames throws', async () => {
    const error = new Error('useCase fails');
    listGames.mockRejectedValueOnce(error);

    const promise = sut.perform();

    expect(promise).rejects.toThrow(error);
  });

  it('should return 200 with games on success', async () => {
    const result = await sut.perform();

    expect(result).toEqual({
      statusCode: 200,
      data: games,
    });
  });
});
