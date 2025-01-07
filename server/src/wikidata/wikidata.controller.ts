import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { WikidataService } from './wikidata.service';

@Controller('wikidata')
export class WikidataController {
  constructor(private readonly WikidataService: WikidataService) {}

  @Get('search')
  async searchBooks(@Query('query') query: string) {
    if (!query) {
      throw new HttpException(
        'Query parameter is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.WikidataService.fetchBookDetails(query);
  }
}
