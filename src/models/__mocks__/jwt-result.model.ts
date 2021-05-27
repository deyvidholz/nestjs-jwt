import * as faker from 'faker';
import { JwtResult } from '../jwt-result.model';

export const jwtResultMock: JwtResult = {
  accessToken: faker.internet.password(),
};
