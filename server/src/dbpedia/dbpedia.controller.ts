import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { DbpediaService } from './dbpedia.service';

@Controller('dbpedia')
export class DbpediaController {
  constructor(private readonly dbpediaService: DbpediaService) {}

  @Get('search')
  async searchBooks(@Query('query') query: string) {
    if (!query) {
      throw new HttpException('Query parameter is required', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.dbpediaService.searchBooks(query);
    } catch (error) {
      throw new HttpException(
        'Error while fetching book details from DBpedia',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
