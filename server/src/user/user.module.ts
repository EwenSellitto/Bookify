import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GoogleBooksModule } from 'src/google-books/google-books.module';

@Module({
  imports: [GoogleBooksModule],
  controllers: [UserController],
  providers: [UserService]

})
export class UserModule {}
