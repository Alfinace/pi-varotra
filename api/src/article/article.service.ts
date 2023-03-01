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
  private stringToSlug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }
  async create(createArticleDto: CreateArticleDto) {
    const article = await this.articleRepository.create({
      ...createArticleDto,
      slug: this.stringToSlug(createArticleDto.designation + ' ' + (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString()),
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
    var condition: any = {
      categoryId: { [Op.in]: [...filter.categories] },
      archived: false,
      unitPrice: { [Op.between]: [filter.range.lower, filter.range.upper] },
    }
    if (filter.keyWord.trim() !== '') {
      condition = {
        ...condition,
        designation: { [Op.like]: `%${filter.keyWord}%` }
      }
    }
    let conditionStore = {
      model: Store,
      as: 'store',
      where: {
        city: { [Op.in]: [...filter.villes] },

      }
    }
    if (filter.villes.length === 1 && filter.villes[0] === 'Tous') {
      delete conditionStore.where.city;
    }
    

    if (filter.categories.length === 0) {
      delete condition.categoryId;
    }
    return this.articleRepository.findAndCountAll({
      where: {
        ...condition
      },
      limit,
      offset,
      distinct: true,
      include: [{
        all: true
      },
        conditionStore,
      {
        model: Category,
        as: 'category',
        // where: {
        //   [Op.or]: [{
        //     name: { [Op.like]: `%${filter.keyWord}%` }
        //   }
        //   ]

        // }
      }
      ],
      order: [[filter.orderBy, filter.order]],
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
      order: [['id', 'DESC']]
    });
  }

  findAllByCategory(categoryId, offset: number, limit: number) {
    return this.articleRepository.findAndCountAll({
      where: { categoryId, archived: false },
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
      order: [['id', 'DESC']]
    });
  }

  findOne(id: number) {
    return this.articleRepository.findOne({
      where: { id, archived: false },
      include: [ImageArticle, Store],
    });
  }

  findOneBySlug(slug: string) {
    return this.articleRepository.findOne({
      where: { slug, archived: false },
      include: [ImageArticle, Store],
    });
  }

  async update(id: number, article: UpdateArticleDto | any) {
    for (let index = 0; index < article.imageIdDeleted.length; index++) {
      const element = article.imageIdDeleted[index];
      this.imageArticleRepository.destroy({ where: { id: element } });
    }
    

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
