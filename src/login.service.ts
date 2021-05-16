import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const badInput = !username || !password;

    if (badInput) {
      throw new BadRequestException();
    }

    const user = await this.usersRepository.findOne({ email: username });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isInvalidPassword = !user.checkPassword(password);

    if (isInvalidPassword) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.email, sub: user.id };
    const jwt = {
      accessToken: this.jwtService.sign(payload),
    };

    return jwt;
  }
}
