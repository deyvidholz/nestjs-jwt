import * as faker from 'faker';
import { LoginDTO } from '../login.dto';

export const loginDTOMock: LoginDTO = {
  username: faker.internet.email(),
  password: faker.internet.password(),
};
