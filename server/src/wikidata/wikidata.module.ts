import { Module } from '@nestjs/common';
import { WikidataService } from './wikidata.service';
import { WikidataController } from './wikidata.controller';

@Module({
  controllers: [WikidataController],
  providers: [WikidataService],
})
export class WikidataModule {}
