import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import * as request from 'supertest';
import { factory, useRefreshDatabase, useSeeding } from 'typeorm-seeding';
import { AppModule } from '../src/app.module';
import { LoginDTO } from '../src/dtos/login.dto';
import { User } from '../src/entities/user.entity';

describe('A user make a request to the authentication in the system', () => {
  let app: INestApplication;

  const makePayload = (payload?: Partial<LoginDTO>) =>
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

  it('should return BAD_REQUEST status when email or password is bad formated', () =>
    request(app.getHttpServer())
      .post('/login')
      .send({ username: '', password: '' })
      .expect(HttpStatus.BAD_REQUEST));

  it('should return UNAUTHORIZED status when email is non-registered', () =>
    request(app.getHttpServer())
      .post('/login')
      .send(makePayload())
      .expect(HttpStatus.UNAUTHORIZED));

  it('should return UNAUTHORIZED status when email is registered and password is incorrect', async () => {
    const { email } = await factory(User)().create();
    const payload = makePayload({
      username: email,
      password: faker.internet.password(),
    });

    await request(app.getHttpServer())
      .post('/login')
      .send(payload)
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should return valid jwt when valid credentials is given', async () => {
    const { id, email, password } = await factory(User)().create();
    const payload = makePayload({ username: email, password });
    const { body, status } = await request(app.getHttpServer())
      .post('/login')
      .send(payload);
    const jwtExpiresIn = app.get(ConfigService).get('JWT_EXPIRES_IN');

    expect(status).toBe(HttpStatus.OK);
    expect(body.accessToken).toBeTokenMatching({ sub: id });
    expect(body.accessToken).toBeTokenExpiringIn(jwtExpiresIn);
  });

  afterAll(async () => {
    // FIXME: this line was added to avoid jest open handle error. https://github.com/visionmedia/supertest/issues/520#issuecomment-475854128
    await new Promise((resolve) => setTimeout(() => resolve(true), 500));
  });
});
