import { Test } from '@nestjs/testing';
import { loginDTOMock } from '../dtos/__mocks__/login.dto';
import { jwtResultMock } from '../models/__mocks__/jwt-result.model';
import { LoginServiceMock } from '../services/__mocks__/login.service';
import { LoginService } from '../services/login.service';
import { LoginController } from './login.controller';

describe('LoginController', () => {
  let controller: LoginController;
  let service: LoginService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService],
    })
      .overrideProvider(LoginService)
      .useClass(LoginServiceMock)
      .compile();

    service = moduleRef.get<LoginService>(LoginService);
    controller = moduleRef.get<LoginController>(LoginController);
  });

  it('should return a JWT', async () => {
    const login = jest.spyOn(service, 'login');
    expect(await controller.login(loginDTOMock)).toBe(jwtResultMock);
    expect(login).toHaveBeenCalledWith(loginDTOMock);
  });
});
