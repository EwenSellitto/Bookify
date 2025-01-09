import { Controller, Get, Post, Delete, Body, Param, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
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

  @Post('me/book')
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

  @Get('me/recommendation')
  async getRecommendation(@GetUser() user: User) {
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const profile = await this.myProfile(user);
    const books = profile.books;
    const authors = books
      .map((book) => book?.authors)
      .flat()
      .filter(Boolean);
    let genres = books
      .map((book) => book?.genres)
      .flat()
      .filter(Boolean);

    if (authors.length === 0 && genres.length === 0) {
      throw new InternalServerErrorException('No authors or genres found for recommendation');
    }

    genres = Array.from(new Set(genres));

    let booksResponse = null;
    let selectionType: 'author' | 'genre';
    let searchParam: { author?: string; genre?: string };

    while (!booksResponse) {
      selectionType = Math.random() < 0.2 ? 'author' : 'genre';

      if (selectionType === 'author' && authors.length > 0) {
        const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
        searchParam = { author: randomAuthor };
      } else if (selectionType === 'genre' && genres.length > 0) {
        const genreComponents = genres
          .map((genre) => genre.split('/').map((part) => part.trim()))
          .flat();

        const uniqueGenreComponents = Array.from(new Set(genreComponents));
        const randomGenre = uniqueGenreComponents[Math.floor(Math.random() * uniqueGenreComponents.length)];
        searchParam = { genre: randomGenre };
      } else {
        throw new InternalServerErrorException('No valid author or genre to select');
      }

      booksResponse = await this.googleBooksService.getBooksRecommendation(searchParam);

      if (!booksResponse) {
        continue;
      }
    }

    return booksResponse;
  }

}
