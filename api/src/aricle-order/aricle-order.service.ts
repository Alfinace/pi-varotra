import { Inject, Injectable } from '@nestjs/common';
import { CreateAricleOrderDto } from './dto/create-aricle-order.dto';
import { UpdateAricleOrderDto } from './dto/update-aricle-order.dto';
import { ArticleOrder } from './entities/aricle-order.entity';

@Injectable()
export class AricleOrderService {
  constructor(
    @Inject('ARTICLE_ORDER_REPOSITORY')
    private articleOrderRepository: typeof ArticleOrder,
  ) {}

  create(createAricleOrderDto: CreateAricleOrderDto | any) {
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
