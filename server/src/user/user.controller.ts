import { Controller, Get, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('user')
export class UserController {
  constructor(private readonly prisma: PrismaService) { }

  @Get('me')
  async myProfile(@GetUser() user: User) {
    const current_user = await this.prisma.user.findUnique({
      where: {
        username: user.username,
      },
      include: {
        BookUserLink: {
          include: {
            book: true,
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { ...current_user, password: undefined };
  }

  @Get('me/username')
  async myUsername(@GetUser() user: User) {
    return { username: user.username };
  }
}
