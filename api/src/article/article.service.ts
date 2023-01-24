import { ImageArticle } from 'src/image-article/entities/image-article.entity';
import { Article } from 'src/article/entities/article.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from 'src/user/entities/user.entity';
import { Op } from 'sequelize';
import { Store } from 'src/store/entities/store.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private articleRepository: typeof Article,
    @Inject('IMAGE_ARTICLE_REPOSITORY')
    private imageArticleRepository: typeof ImageArticle,
  ) { }
  async create(createArticleDto: CreateArticleDto) {
    const article = await this.articleRepository.create({
      ...createArticleDto,
    });
    const images = await this.imageArticleRepository.bulkCreate(
      createArticleDto.images.map(
        (image) => ({ articleId: article.id, image: image }),
        { returning: true },
      ),
    );

    return await article.$set('images', images);
  }

  findAll(offset: number, limit: number) {
    if (isNaN(offset) || isNaN(limit)) {
      offset = 0;
      limit = 10;
    }
    return this.articleRepository.findAndCountAll({
      where: {
        archived: false
      },
      limit,
      offset,
      distinct: true,
      include: [
        {
          model: ImageArticle,
          as: 'images'
        },
        {
          model: Store,
          as: 'store'
        },
        {
          model: Category,
          as: 'category',
        },
      ],
    });
  }

  findAllWithFilter(filter, offset: number, limit: number) {
    return this.articleRepository.findAndCountAll({
      where: {
        categoryId: { [Op.in]: [filter.categorie] },
        archived: false,
        unitPrice: { [Op.between]: [filter.range.lower, filter.range.upper] },
      },
      limit,
      distinct: true,
      offset,
      include: [{ all: true }],
      order: [[filter.updatedAt, filter.order]],
    })
  }

  findAllByStore(storeId, offset: number, limit: number) {
    return this.articleRepository.findAndCountAll({
      where: { storeId, archived: false },
      include: [ImageArticle,
        {
          model: Store,
          as: 'store',
          include: [{
            model: User,
            as: 'user',
            attributes: ['address', 'avatar', 'contact', 'firstname', 'lastname', 'socialNetwork']
          }],
        }],
      limit,
      offset,
      distinct: true,
      order: [['id', 'ASC']]
    });
  }

  findOne(id: number) {
    return this.articleRepository.findOne({
      where: { id, archived: false },
      include: [ImageArticle, Store],
    });
  }

  async update(id: number, article: UpdateArticleDto | any) {
    for (let index = 0; index < article.imageIdDeleted.length; index++) {
      const element = article.imageIdDeleted[index];
      this.imageArticleRepository.destroy({ where: { id: element } });
    }
    console.log(article);

    if (article.images.length > 0) {
      await this.imageArticleRepository.bulkCreate(
        article.images.map(
          (image) => ({ articleId: id, image: image }),
          { returning: true },
        ),
      );
    }
    return this.articleRepository.update(article, {
      where: { id },
      limit: 1,
    });

  }

  archive(id: number) {
    return this.articleRepository.update({ archived: true }, { where: { id } });
  }

  approve(id: number) {
    return this.articleRepository.update({ approved: true }, { where: { id } });
  }

  remove(id: number) {
    return this.articleRepository.destroy({ where: { id } });
  }
}
