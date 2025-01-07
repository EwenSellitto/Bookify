import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DbpediaService } from './dbpedia.service';

@Controller('dbpedia')
export class DbpediaController {
  constructor(private readonly dbpediaService: DbpediaService) { }

  @Get('search')
  async searchBooks(
    @Query('title') title?: string,
    @Query('author') author?: string,
    @Query('genre') genre?: string,
  ) {
    if (!title && !author && !genre) {
      throw new HttpException(
        'At least one parameter (title, author, or genre) is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.dbpediaService.searchBooks(title, author, genre);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error while fetching book details from DBpedia',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
