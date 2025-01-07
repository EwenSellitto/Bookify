import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { GoogleBooksService } from './google-books.service';

@Controller('google-books')
export class GoogleBooksController {
  constructor(private readonly googleBooksService: GoogleBooksService) { }

  @Get('search')
  async searchBooks(
    @Query('title') title?: string,
    @Query('author') author?: string,
    @Query('genre') genre?: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    if (!title && !author && !genre) {
      throw new HttpException(
        'At least one parameter (title, author, or genre) is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.googleBooksService.searchBooks(
        title,
        author,
        genre,
        page,
        pageSize,
      );
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error while fetching book details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('genres')
  async getGenres(@Query('count') count: number) {
    if (!count || count <= 0) {
      throw new HttpException(
        'Count must be a positive integer',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      return this.googleBooksService.getGenres(count);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error while fetching genres',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('book')
  async getBookById(@Query('id') id: string) {
    try {
      return await this.googleBooksService.getBookById(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error while fetching book details by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
