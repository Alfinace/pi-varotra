import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  storeId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty()
  @IsNotEmpty()
  designation: string;

  @ApiProperty()
  @IsNotEmpty()
  images: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  detail: number;
}
