import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JWT, JWTResult } from './typings/jwt.typing';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<JWTResult> {
    const emptyCredentials = !username || !password;

    if (emptyCredentials) {
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

    const payload: JWT = { sub: user.id };
    const jwt: JWTResult = {
      accessToken: this.jwtService.sign(payload),
    };

    return jwt;
  }
}