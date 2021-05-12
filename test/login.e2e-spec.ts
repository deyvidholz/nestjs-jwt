import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as faker from 'faker';
import { StatusCodes } from 'http-status-codes';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('A user make a request to the authentication in the system', () => {
  let app: INestApplication;

  // TODO: change payload type to Partial<LoginDTO>
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
  });

  it('should return http status code 400 when email or password is bad formated', () =>
    request(app.getHttpServer())
      .post('/login')
      .send({
        username: '',
        password: '',
      })
      .expect(StatusCodes.BAD_REQUEST));

  it('should return http status code 401 when email is non-registered', () =>
    request(app.getHttpServer())
      .post('/login')
      .send(makePayload())
      .expect(StatusCodes.UNAUTHORIZED));

  it('should return http status code 401 when email is registered and password is incorrect', () =>
    request(app.getHttpServer())
      .post('/login')
      // TODO: change this payload to registered email
      .send(makePayload())
      .expect(StatusCodes.UNAUTHORIZED));

  it('should return http status code 200 when valid credentials is given', () =>
    request(app.getHttpServer())
      .post('/login')
      // TODO: change this payload to valid credentials
      .send(makePayload())
      .expect(StatusCodes.OK));

  afterAll(async () => {
    // FIXME: this line was added to avoid jest open handle error. https://github.com/visionmedia/supertest/issues/520#issuecomment-475854128
    await new Promise((resolve) => setTimeout(() => resolve(true), 500));
  });
});
