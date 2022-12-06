import { Controller } from '@/application/controllers';
import { ServerError } from '@/application/errors';
import { HttpResponse } from '@/application/protocols';
import { mocked } from 'jest-mock';
import { ValidationComposite } from '@/application/validation';

jest.mock('@/application/validation/composite');

class ControllerStub extends Controller {
  result: HttpResponse = {
    statusCode: 200,
    data: 'any_data',
  };

  async perform(): Promise<HttpResponse> {
    return this.result;
  }
}

describe('Controller', () => {
  let sut: ControllerStub;

  beforeEach(() => {
    sut = new ControllerStub();
  });

  it('should return 400 if validation fails', async () => {
    const error = new Error('validation fails');

    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error),
    }));
    mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy);

    const result = await sut.handle('any_value');

    expect(ValidationCompositeSpy).toHaveBeenCalledWith([]);
    expect(result).toEqual({
      statusCode: 400,
      data: error,
    });
  });

  it('should return 500 if perform throws', async () => {
    const error = new Error('perform error');
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error);

    const result = await sut.handle('any_value');

    expect(result).toEqual({
      statusCode: 500,
      data: new ServerError(error),
    });
  });

  it('should return same result as perform', async () => {
    const result = await sut.handle('any_value');

    expect(result).toEqual(sut.result);
  });
});
