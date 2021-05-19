import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtInterface } from './interfaces/jwt.interface';
import { JwtPayload } from './types/jwtPayload.type';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<JwtInterface> {
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

    const payload: JwtPayload = { username: user.email, sub: user.id };
    const jwt: JwtInterface = {
      accessToken: this.jwtService.sign(payload),
    };

    return jwt;
  }
}
