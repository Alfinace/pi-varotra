import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiProperty()
  @IsNumber()
  categoryId: number;

  @ApiProperty()
  designation: string;

  @ApiProperty()
  @IsNumber()
  stock: number;

  @ApiProperty()
  @IsNumber()
  unitPrice: number;

  @ApiProperty()
  detail: number;
}
