import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WikidataModule } from './wikidata/wikidata.module';
import { DbpediaModule } from './dbpedia/dbpedia.module';

@Module({
  imports: [
    WikidataModule,
    DbpediaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
