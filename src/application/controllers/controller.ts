/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { badRequest, serverError } from '../helpers';
import { HttpResponse, Validator } from '../protocols';
import { ValidationComposite } from '../validation';

export abstract class Controller {
  abstract perform(input: any): Promise<HttpResponse>;

  buildValidators(httpRequest: any): Validator[] {
    return [];
  }

  async handle(input: any): Promise<HttpResponse> {
    const error = this.validate(input);
    if (error) {
      return badRequest(error);
    }

    try {
      return await this.perform(input);
    } catch (err) {
      return serverError(err);
    }
  }

  private validate(httpRequest: any): Error | undefined {
    const validators = this.buildValidators(httpRequest);
    return new ValidationComposite(validators).validate();
  }
}
