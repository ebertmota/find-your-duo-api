/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverError } from '../helpers';
import { HttpResponse } from '../protocols';

export abstract class Controller {
  abstract perform(input: any): Promise<HttpResponse>;

  async handle(input: any): Promise<HttpResponse> {
    try {
      return await this.perform(input);
    } catch (err) {
      return serverError(err);
    }
  }
}
