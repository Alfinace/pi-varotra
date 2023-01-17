import { PartialType } from '@nestjs/swagger';
import { CreateImageArticleDto } from './create-image-article.dto';

export class UpdateImageArticleDto extends PartialType(CreateImageArticleDto) {}
