import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WikidataModule } from './wikidata/wikidata.module';
import { DbpediaModule } from './dbpedia/dbpedia.module';
import { GoogleBooksModule } from './google-books/google-books.module';

@Module({
  imports: [
    WikidataModule,
    DbpediaModule,
    GoogleBooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
