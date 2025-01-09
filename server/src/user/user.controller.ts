import { Controller, Get, Post, Delete, Body, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleBooksService } from 'src/google-books/google-books.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly googleBooksService: GoogleBooksService,
  ) {}


  @Get('me')
  async myProfile(@GetUser() user: User) {
    if (!user) {
      throw new NotFoundException('User not found');
    }

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

    if (!current_user) {
      throw new NotFoundException('User not found');
    }

    const bookIds = current_user.BookUserLink.map((link) => link.book.cUnLivreTqtId);

    const books = await Promise.all(
      bookIds.map((id) => this.googleBooksService.getBookById(id))
    );

    return {
      // ...current_user,
      password: undefined,
      books,
    };
  }


  @Get('me/username')
  async myUsername(@GetUser() user: User) {
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { username: user.username };
  }

  @Post('me/books')
  async addBook(@GetUser() user: User, @Body() body: { cUnLivreTqtId: string }) {
    const { cUnLivreTqtId } = body;
    if (!cUnLivreTqtId) {
      throw new BadRequestException('Book ID is required');
    }

    const book = await this.prisma.book.upsert({
      where: { cUnLivreTqtId },
      create: { cUnLivreTqtId },
      update: {},
    });

    const bookUserLink = await this.prisma.bookUserLink.upsert({
      where: { bookId_userId: { bookId: book.id, userId: user.id } },
      create: { bookId: book.id, userId: user.id },
      update: {},
    });

    return { message: 'Book added successfully', bookUserLink };
  }

  @Delete('me/books/:cUnLivreTqtId')
  async deleteBook(@GetUser() user: User, @Param('cUnLivreTqtId') cUnLivreTqtId: string) {
    const book = await this.prisma.book.findUnique({
      where: { cUnLivreTqtId },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const bookUserLink = await this.prisma.bookUserLink.findUnique({
      where: { bookId_userId: { bookId: book.id, userId: user.id } },
    });

    if (!bookUserLink) {
      throw new NotFoundException('This book is not linked to your account');
    }

    await this.prisma.bookUserLink.delete({
      where: { id: bookUserLink.id },
    });

    return { message: 'Book removed successfully' };
  }
}
