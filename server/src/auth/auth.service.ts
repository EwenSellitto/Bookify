import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) { }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET,
    });
  }

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      throw new UnauthorizedException('username or password is incorrect');
    }
    const valid = await argon.verify(user.password, password);
    if (!valid) {
      throw new UnauthorizedException('username or password is incorrect');
    }
    const token = await this.signToken(user.id, user.username);
    return {
      message: 'Login successful',
      token,
    };
  }

  async register(username: string, password: string) {
    try {
      const user = await this.prisma.user.create({
        data: {
          username,
          password: await argon.hash(password),
        },
      });
      return {
        message: 'Registration successful',
        data: { ...user, password: undefined },
        token: await this.signToken(user.id, user.username),
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Username already exists');
      }
      throw error;
    }
  }
}
