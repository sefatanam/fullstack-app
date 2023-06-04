import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController, ProductsService } from '@fullstack-app/products';
import { TagsController } from '@fullstack-app/tags';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, TagsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
