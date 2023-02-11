import { ArticleOrder } from 'src/aricle-order/entities/aricle-order.entity';
import { Order } from 'src/order/entities/order.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/user/entities/user.entity';
import { Article } from 'src/article/entities/article.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: typeof Order,
    @Inject('ARTICLE_ORDER_REPOSITORY')
    private articleOrderRepository: typeof ArticleOrder,
  ) { }

  async create(createOrderDto: CreateOrderDto, userId) {
    const newOrder = await this.orderRepository.create({
      ...createOrderDto,
      storeId: createOrderDto.articles[0].storeId,
      userId
    });
    const orderArticles = await this.articleOrderRepository.bulkCreate(
      createOrderDto.articles.map(
        (article) => ({
          orderId: newOrder.id,
          articleId: article.id,
          quantity: article.quantity,
          unitPrice: article.unitPrice,
        }),
        { returning: true },
      ),
    );
    let articles = createOrderDto.articles.map((a: any, i: number) => {
      return { ...orderArticles[i].dataValues, designation: a.designation }
    })

    return { ...newOrder, articles };
  }

  findByStore(storeId: number, limit: number, offset: number) {
    return this.orderRepository.findAndCountAll({
      where: {
        storeId
      },
      include: [
        {
          model: Article,
          as: 'articles',
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email', 'address', 'contact', 'city']
        }
      ],
      order: [
        ['createdAt', 'DESC']
      ],
      limit,
      offset,
      nest: true
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, data) {
    return this.orderRepository.update(data, { where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
