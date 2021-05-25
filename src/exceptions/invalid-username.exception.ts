import { UnauthorizedException } from '@nestjs/common';

export class InvalidUsername extends UnauthorizedException {
  constructor(username: string) {
    super(`Username ${username} does not exist.`);
  }
}
