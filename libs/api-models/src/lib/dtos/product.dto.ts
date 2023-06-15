import { IsArray, IsBoolean, IsInt, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { TagDto } from "@fullstack-app/tags";
import { Type } from "class-transformer";

export class ProductDto {
  id:string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsInt()
  price: number;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsString()
  image: string;
  @ApiProperty()
  @IsString()
  videoUrl: string;
  @IsBoolean()
  isDisable: boolean;
  @ApiProperty({ isArray: true, type: () => TagDto })
  @IsArray()
  @Type(() => TagDto)
  tags: TagDto[];
}
