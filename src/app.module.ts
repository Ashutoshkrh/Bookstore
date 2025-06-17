import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './configs/env.config';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DoggModule } from './dogg/dogg.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    AuthorsModule,
    BooksModule,
    DoggModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'bookstore.db',
      entities: [__dirname + '/**/**/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
