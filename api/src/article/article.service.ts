import { ImageArticle } from 'src/image-article/entities/image-article.entity';
import { Article } from 'src/article/entities/article.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from 'src/user/entities/user.entity';
import { Op } from 'sequelize';
import { Store } from 'src/store/entities/store.entity';

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
      limit,
      offset,
      include: [
        {
          model: ImageArticle,
          as: 'images'
        },
        {
          model: Store,
          as: 'store'
        }
      ],
    });
  }

  findAllWithFilter(filter, offset: number, limit: number) {
    this.articleRepository.findAndCountAll({
      where: {
        categoryId: { [Op.in]: [filter.categorie] },
        unitPrice: { [Op.between]: [filter.range.lower, filter.range.upper] },
      },
      limit,
      offset,
      include: [{ all: true }],
      order: [[filter.updatedAt, filter.order]],
    })
  }

  findAllByStore(storeId, offset: number, limit: number) {
    return this.articleRepository.findAndCountAll({
      where: { storeId },
      include: [ImageArticle],
      limit,
      offset,
      order: [['id', 'ASC']]
    });
  }

  findOne(id: number) {
    return this.articleRepository.findByPk(id, {
      include: [ImageArticle, Store],
    });
  }

  update(id: number, article: UpdateArticleDto | any) {
    return this.articleRepository.update(article, {
      where: { id },
      limit: 1,
    });
  }

  archive(id: number) {
    return this.articleRepository.update({ deleted: true }, { where: { id } });
  }

  approve(id: number) {
    return this.articleRepository.update({ approved: true }, { where: { id } });
  }

  remove(id: number) {
    return this.articleRepository.destroy({ where: { id } });
  }
}
