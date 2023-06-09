import { IsArray, IsBoolean, IsInt, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { TagDto } from "@fullstack-app/tags";
import { Type } from "class-transformer";

export class ProductDto {
  readonly id:string;
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
  @IsString()
  readonly videoUrl: string;
  @IsBoolean()
  readonly isDisable: boolean;
  @ApiProperty({ isArray: true, type: () => TagDto })
  @IsArray()
  @Type(() => TagDto)
  tags: TagDto[];
}
