import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@app/modules/users/services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(account: string, pass: string): Promise<{ token: string } | Error> {
    try {
      const user = await this.usersService.findUserByUsername(account);
      if (!user) {
        return new NotFoundException('User not found');
      }
      if (user.password !== pass) {
        return new UnauthorizedException('Invalid credentials');
      }
      const payload = { sub: user.id, name: user.name, email: user.email };

      const token = await this.jwtService.signAsync(payload, {
        secret: this.configService.get('config.jwt.secret'),
        expiresIn: this.configService.get('config.jwt.expiresIn'),
      });
      return { token };
    } catch (error) {
      return new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
