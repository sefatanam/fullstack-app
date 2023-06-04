import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';

@Module({
  controllers: [TagsController],
  providers: [],
  exports: [],
})
export class TagsModule {}
