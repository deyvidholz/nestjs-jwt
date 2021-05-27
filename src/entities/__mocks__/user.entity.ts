import * as faker from 'faker';

export const userMock = {
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  isValidPassword: jest.fn(() => true),
};
