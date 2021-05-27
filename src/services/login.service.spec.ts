import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as faker from 'faker';
import { Repository } from 'typeorm';
import { loginDTOMock } from '../dtos/__mocks__/login.dto';
import { LoginDTO } from '../dtos/login.dto';
import { userMock } from '../entities/__mocks__/user.entity';
import { User } from '../entities/user.entity';
import { EmptyCredentials } from '../exceptions/empty-credentials.exception';
import { InvalidPassword } from '../exceptions/invalid-password.exception';
import { InvalidUsername } from '../exceptions/invalid-username.exception';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: JwtService,
          useValue: { sign: () => faker.internet.password() },
        },
        {
          provide: getRepositoryToken(User),
          useValue: { findOne: () => userMock },
        },
        LoginService,
      ],
    }).compile();

    service = moduleRef.get<LoginService>(LoginService);
    repository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should throw EmptyCredentials when username is not provided', async () => {
    const loginDTO: LoginDTO = {
      username: '',
      password: faker.internet.password(),
    };

    await expect(service.login(loginDTO)).rejects.toThrowError(
      EmptyCredentials,
    );
  });

  it('should throw EmptyCredentials when password is not provided', async () => {
    const loginDTO: LoginDTO = {
      username: faker.internet.email(),
      password: '',
    };

    await expect(service.login(loginDTO)).rejects.toThrowError(
      EmptyCredentials,
    );
  });

  it('should throw InvalidUsername', async () => {
    jest.spyOn(repository, 'findOne').mockImplementationOnce(() => null);
    await expect(service.login(loginDTOMock)).rejects.toThrowError(
      InvalidUsername,
    );
  });

  it('should throw InvalidPassword', async () => {
    jest.spyOn(userMock, 'isValidPassword').mockImplementationOnce(() => false);
    await expect(service.login(loginDTOMock)).rejects.toThrowError(
      InvalidPassword,
    );
  });

  it('should return valid JWT', async () => {
    expect(await service.login(loginDTOMock)).toHaveProperty('accessToken');
  });
});
