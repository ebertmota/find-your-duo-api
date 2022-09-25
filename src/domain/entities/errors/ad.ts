export class AdNotFoundError extends Error {
  constructor() {
    super('Ad with provided info was not found');
    this.name = 'AdNotFoundError';
  }
}
