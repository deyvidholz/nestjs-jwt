import { JwtResultMock } from '../../models/__mocks__/jwt-result.model';

export class LoginServiceMock {
  login = jest.fn(() => JwtResultMock);
}
