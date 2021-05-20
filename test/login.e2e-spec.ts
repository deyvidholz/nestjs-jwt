import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as faker from 'faker';
import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';
import { factory, useRefreshDatabase, useSeeding } from 'typeorm-seeding';
import { AppModule } from '../src/app.module';
import { User } from '../src/entities/user.entity';

describe('A user make a request to the authentication in the system', () => {
  let app: INestApplication;

  const makePayload = (payload?: { username?: string; password?: string }) =>
    Object.assign(
      {
        username: faker.internet.email(),
        password: faker.internet.password(),
      },
      payload,
    );

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await useRefreshDatabase({ configName: 'typeorm-seeding.config.ts' });
    await useSeeding();
  });

  it('should return http status code 400 when email or password is bad formated', () =>
    request(app.getHttpServer())
      .post('/login')
      .send({ username: '', password: '' })
      .expect(HttpStatus.BAD_REQUEST));

  it('should return http status code 401 when email is non-registered', () =>
    request(app.getHttpServer())
      .post('/login')
      .send(makePayload())
      .expect(HttpStatus.UNAUTHORIZED));

  it('should return http status code 401 when email is registered and password is incorrect', async () => {
    const user = await factory(User)().create();
    const payload = makePayload({
      username: user.email,
      password: faker.internet.password(),
    });

    await request(app.getHttpServer())
      .post('/login')
      .send(payload)
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should return http status code 200 when valid credentials is given', async () => {
    const user = await factory(User)().create();
    const payload = makePayload({ username: user.email, password: user.email });
    const res = await request(app.getHttpServer()).post('/login').send(payload);

    expect(res.status).toBe(HttpStatus.OK);
    expect(res.body.accessToken).toBeTokenMatching({ sub: user.id });
    expect(res.body.accessToken).toBeTokenExpiringIn('1h');
  });

  afterAll(async () => {
    // FIXME: this line was added to avoid jest open handle error. https://github.com/visionmedia/supertest/issues/520#issuecomment-475854128
    await new Promise((resolve) => setTimeout(() => resolve(true), 500));
  });
});
