import { IsBoolean, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ProductRequest {
  @IsString()
  readonly id: string;
  @ApiProperty()
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsInt()
  readonly price: number;
  @ApiProperty()
  @IsString()
  readonly description: string;
  @ApiProperty()
  @IsString()
  readonly image: string;
  @ApiProperty()
  @IsBoolean()
  readonly isDisable: boolean;
}
