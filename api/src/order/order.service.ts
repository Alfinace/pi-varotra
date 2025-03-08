import { ArticleOrder } from 'src/aricle-order/entities/article-order.entity';
import { Order } from 'src/order/entities/order.entity';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/user/entities/user.entity';
import { Article } from 'src/article/entities/article.entity';
import { PaymentU2A } from 'src/payment-u2-a/entities/payment-u2-a.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: typeof Order,
    @Inject('ARTICLE_ORDER_REPOSITORY')
    private articleOrderRepository: typeof ArticleOrder,
    @Inject('ARTICLE_REPOSITORY')
    private articleRepository: typeof Article,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
  ) { }

  async create(createOrderDto: CreateOrderDto, userId) {
      try {
        const newOrder = await this.orderRepository.create({
          ...createOrderDto,
          storeId: createOrderDto.articles[0].storeId,
          userId
        });
        const promiseData = [];
        createOrderDto.articles.forEach(async (a: any) => {
          promiseData.push( this.articleRepository.findOne({ where: { id: a.id } }))
        })
        const data = await Promise.all(promiseData);
        for (let i = 0; i < data.length; i++) {
          const article = data[i];
          const order = createOrderDto.articles.find((a: any) => a.id === article.id);
          if(!article) throw new Error('Article introuvable');
          if (article.stock < order.quantity) {
            throw new Error('Stockage insuffisant pour l\'article ' + createOrderDto.articles[i].designation);
          }else{
            await this.articleRepository.update({
              stock: article.stock - createOrderDto.articles[i].quantity
            }, {
              where: {
                id: createOrderDto.articles[i].id
              }
            })
          }
        }
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
      } catch (error) {
         throw new Error(error.message);
      }

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
          model: PaymentU2A,
          as: 'paymentU2A'
        },
        {
          model: User,
          as: 'user',
          attributes: ['id']
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

  async updateStock(orderId: number) {
    let orders = await this.articleOrderRepository.findAll({
      where: {
        orderId
      },
      include: [
        {
          model: Article,
          as: 'article',
        }
      ]
    })
    var promiseArray = []
    for (let i = 0; i < orders.length; i++) {
      const element = orders[i];
      let p = this.articleRepository.update({
        stock: element.article.stock - element.quantity
      }, {
        where: {
          id: element.article.id
        }
      })
      promiseArray.push(p)
    }
    return await Promise.all(promiseArray)
  }

}
