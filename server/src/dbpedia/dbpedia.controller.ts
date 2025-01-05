import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { DbpediaService } from './dbpedia.service'; // Assuming DbpediaService is created similarly to WikidataService

@Controller('booksy')
export class DbpediaController {
  constructor(private readonly dbpediaService: DbpediaService) {}

  @Get('search')
  async searchBooks(@Query('query') query: string) {
    // Check if the query parameter is provided
    if (!query) {
      throw new HttpException('Query parameter is required', HttpStatus.BAD_REQUEST);
    }

    try {
      // Call the DbpediaService to search for books
      return await this.dbpediaService.searchBooks(query);
    } catch (error) {
      // Handle errors during the search process
      throw new HttpException(
        'Error while fetching book details from DBpedia',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
