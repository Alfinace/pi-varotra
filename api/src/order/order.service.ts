import { ArticleOrder } from 'src/aricle-order/entities/aricle-order.entity';
import { Order } from 'src/order/entities/order.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: typeof Order,
    @Inject('ARTICLE_ORDER_REPOSITORY')
    private articleOrderRepository: typeof ArticleOrder,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const newOrder = await this.orderRepository.create({
      ...createOrderDto,
    });
    const orderArticles = await this.articleOrderRepository.bulkCreate(
      createOrderDto.articles.map(
        (article) => ({
          order_id: newOrder.id,
          article_id: article.id,
          quantite: article.quantite,
          unitPrice: article.unitPrice,
        }),
        { returning: true },
      ),
    );

    return { ...newOrder, articles: orderArticles };
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
