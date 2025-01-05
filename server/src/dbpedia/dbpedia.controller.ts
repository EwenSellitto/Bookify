import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { DbpediaService } from './dbpedia.service';

@Controller('dbpedia')
export class DbpediaController {
  constructor(private readonly dbpediaService: DbpediaService) {}

  @Get('search')
  async searchBooks(
    @Query('query') query?: string,
    @Query('author') author?: string,
    @Query('genre') genre?: string,
  ) {
    if (!query && !author && !genre) {
      throw new HttpException(
        'At least one parameter (query, author, or genre) is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      if (author || genre) {
        // Search by author or genre
        return await this.dbpediaService.searchBooksByAuthorOrGenre(author, genre);
      } else if (query) {
        // Search by general query
        return await this.dbpediaService.searchBooks(query);
      } else {
        throw new HttpException(
          'Invalid combination of query parameters',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Error while fetching book details from DBpedia',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
