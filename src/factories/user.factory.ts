import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from '../entities/user.entity';

define(User, (faker: typeof Faker) => {
  const user = new User();

  user.email = faker.internet.email();
  user.password = user.email;

  return user;
});
