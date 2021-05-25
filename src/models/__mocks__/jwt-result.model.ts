import * as faker from 'faker';
import { JwtResult } from '../jwt-result.model';

export const JwtResultMock: JwtResult = {
  accessToken: faker.internet.password(),
};
