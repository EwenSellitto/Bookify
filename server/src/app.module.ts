import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WikidataModule } from './wikidata/wikidata.module';
import { DbpediaModule } from './dbpedia/dbpedia.module';
import { GoogleBooksModule } from './google-books/google-books.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guard/jwt.guard';

@Module({
  imports: [
    WikidataModule,
    DbpediaModule,
    GoogleBooksModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    AppService,
  ],
})
export class AppModule { }
