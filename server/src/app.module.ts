import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WikidataModule } from './wikidata/wikidata.module';

@Module({
  imports: [
    WikidataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
