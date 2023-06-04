import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class TagDto {
  @IsString()
  readonly id: string;
  @ApiProperty()
  @IsString()
  readonly name: string;
}
