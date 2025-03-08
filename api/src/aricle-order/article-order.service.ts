import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleOrderDto } from './dto/create-article-order.dto';
import { UpdateAricleOrderDto } from './dto/update-article-order.dto';
import { ArticleOrder } from './entities/article-order.entity';

@Injectable()
export class ArticleOrderService {
  constructor(
    @Inject('ARTICLE_ORDER_REPOSITORY')
    private articleOrderRepository: typeof ArticleOrder,
  ) {}

  create(createAricleOrderDto: CreateArticleOrderDto | any) {
    return this.articleOrderRepository.bulkCreate([...createAricleOrderDto]);
  }

  findAll() {
    return `This action returns all aricleOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aricleOrder`;
  }

  update(id: number, updateAricleOrderDto: UpdateAricleOrderDto) {
    return `This action updates a #${id} aricleOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} aricleOrder`;
  }
}
