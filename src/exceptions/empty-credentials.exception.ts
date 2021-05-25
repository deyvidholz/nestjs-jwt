import { BadRequestException } from '@nestjs/common';

export class EmptyCredentials extends BadRequestException {
  constructor() {
    super('Credentials are empty or missing.');
  }
}
