import { PartialType } from '@nestjs/swagger';
import { CreateArticleOrderDto } from './create-article-order.dto';

export class UpdateAricleOrderDto extends PartialType(CreateArticleOrderDto) {}
