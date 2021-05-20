import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDTO } from '../dtos/login.dto';
import { User } from '../entities/user.entity';
import { JWT, JWTResult } from '../typings/jwt.typing';

@Injectable()
export class LoginService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async login({ username, password }: LoginDTO): Promise<JWTResult> {
    const isEmptyCredentials = !username || !password;

    if (isEmptyCredentials) {
      throw new BadRequestException();
    }

    const user = await this.usersRepository.findOne({ email: username });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isInvalidPassword = !user.isValidPassword(password);

    if (isInvalidPassword) {
      throw new UnauthorizedException();
    }

    const jwt: JWT = { sub: user.id };
    const jwtResult: JWTResult = { accessToken: this.jwtService.sign(jwt) };

    return jwtResult;
  }
}
