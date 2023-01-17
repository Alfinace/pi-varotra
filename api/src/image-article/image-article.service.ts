import { Inject, Injectable } from '@nestjs/common';
import { CreateImageArticleDto } from './dto/create-image-article.dto';
import { UpdateImageArticleDto } from './dto/update-image-article.dto';
import { ImageArticle } from './entities/image-article.entity';

@Injectable()
export class ImageArticleService {
  constructor(
    @Inject('IMAGE_ARTICLE_REPOSITORY')
    private userRepository: typeof ImageArticle,
  ) {}
  create(createImageArticleDto: CreateImageArticleDto) {
    return 'This action adds a new imageArticle';
  }

  findAll() {
    return `This action returns all imageArticle`;
  }

  update(id: number, updateImageArticleDto: UpdateImageArticleDto) {
    return `This action updates a #${id} imageArticle`;
  }
}
