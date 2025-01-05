import { Module } from '@nestjs/common';
import { DbpediaService } from './dbpedia.service';
import { DbpediaController } from './dbpedia.controller';

@Module({
  controllers: [DbpediaController],
  providers: [DbpediaService],
})
export class DbpediaModule {}
