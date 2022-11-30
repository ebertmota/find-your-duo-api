import { mock, MockProxy } from 'jest-mock-extended';
import { ListGames, setupListGames } from '@/domain/useCases';
import { FindGamesWithAdsCount } from '@/domain/contracts/repositories';
import { createFakeGame } from '../../helpers/mocks/entities';

describe('ListGamesUseCase', () => {
  let games: FindGamesWithAdsCount.Output;
  let gamesRepo: MockProxy<FindGamesWithAdsCount>;
  let sut: ListGames;

  beforeAll(() => {
    games = [
      {
        ...createFakeGame(),
        _count: { ads: 2 },
      },
      {
        ...createFakeGame(),
        _count: { ads: 3 },
      },
    ];
    gamesRepo = mock();
    gamesRepo.findManyWithAdsCount.mockResolvedValue(games);
  });

  beforeEach(() => {
    sut = setupListGames(gamesRepo);
  });

  it('should call GamesRepository findManyWithAdsCount', async () => {
    await sut();

    expect(gamesRepo.findManyWithAdsCount).toHaveBeenCalledTimes(1);
  });

  it('should rethrow if GamesRepository findManyWithAdsCount throws', async () => {
    const error = new Error('repository fails');
    gamesRepo.findManyWithAdsCount.mockRejectedValueOnce(error);

    const promise = sut();

    expect(promise).rejects.toThrow(error);
  });

  it('should return games with formatted count on success', async () => {
    const result = await sut();

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      {
        ...games[0],
        _count: undefined,
        count: games[0]._count,
      },
      {
        ...games[1],
        _count: undefined,
        count: games[1]._count,
      },
    ]);
  });
});
