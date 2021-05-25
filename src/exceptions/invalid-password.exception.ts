import { UnauthorizedException } from '@nestjs/common';

export class InvalidPassword extends UnauthorizedException {
  constructor() {
    super('Password provided does not match.');
  }
}
