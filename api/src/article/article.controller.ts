import { ImageArticle } from 'src/image-article/entities/image-article.entity';
import { RoleGuard } from './../auth/role.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpException,
  UseGuards,
  ForbiddenException,
  Res,
  UseInterceptors,
  Put,
} from '@nestjs/common';

import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import e, { Response } from 'express';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/auth/user.decorator';
import { UserInterceptor } from 'src/auth/user.interceptor';
import { log } from 'console';

@Controller('articles')
@UseInterceptors(UserInterceptor)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(@Body() createArticleDto: CreateArticleDto, @User() user) {

    return this.articleService.create({
      ...createArticleDto,
      storeId: user.storeId,
    });
  }

  @Get()
  async findAll(@Query('size') limit: number, @Query('page') offset: number, @Query('categoryId') categoryId: number) {
    try {
      if (offset !== 0) {
        offset = offset * limit;
      }
      var articles = isNaN(categoryId) ? await this.articleService.findAll(offset, limit) : await this.articleService.findAllByCategory(categoryId, offset, limit);
      articles.rows = articles.rows.map((article) => {
        article.images = article.images.map(i => {
          i.image = process.env.BASE_URL_IMAGE + i.image;
          return i
        })
        article.store.logo = process.env.BASE_URL_IMAGE + article?.store?.logo
        return article;
      })

      return articles
    } catch (error) {
      throw new HttpException("Can't get articles", 500);
    }
  }

  @Get('current-user')
  @UseGuards(JwtAuthGuard)
  async findAllCurrentUser(@Query('size') limit: number, @Query('page') offset: number, @User() user) {
    try {
      if(!limit && !offset) {
        limit = 10
        offset = 0
      }
      if (offset !== 0) {
        offset = offset * limit;
      }

      var articles = await this.articleService.findAllByStore(user.storeId, offset, limit);

      articles.rows = articles.rows.map((article) => {
        article.images = article.images.sort((a, b) => b.id - a.id)
        .map(i => {
          i.image = process.env.BASE_URL_IMAGE + i.image;
          return i
        })
        return article;
      })
      return articles;
    } catch (error) {
      throw new HttpException("Can't get articles", 500);
    }
  }



  @Get('store/:id')
  async findAllByStore(@Query('size') limit: number, @Query('page') offset: number, @Param('id') id: string) {
    try {
      if (offset !== 0) {
        offset = offset * limit;
      }
      let articles = await this.articleService.findAllByStore(id, offset, limit);
      articles.rows = articles.rows.map((article) => {
        article.images = article.images.sort((a, b) => b.id - a.id)
        .map(i => {
          i.image = process.env.BASE_URL_IMAGE + i.image;
          return i
        })
        article.store.logo = (article.store.logo && article.store.logo !== 'none') ? process.env.BASE_URL_IMAGE + article.store.logo : null;
        return article;
      })
      return articles;
    } catch (error) {
      throw new HttpException("Can't get articles", 500);
    }
  }

  @Get('plus-vendu')
  async findAllPlusVendu(@Query('size') limit: number, @Query('page') offset: number, @User() user) {
    try {
      if(!limit && !offset) {
        limit = 10
        offset = 0
      }
      if (offset !== 0) {
        offset = offset * limit;
      }

      var articles = await this.articleService.findAllPlusVendu(offset, limit);
      articles.rows = articles.rows.map((article) => {
        article.images = article.images.sort((a, b) => b.id - a.id)
        .map(i => {
          i.image = process.env.BASE_URL_IMAGE + i.image;
          return i
        })
        return article;
      }).sort((a, b) => {
        if (a.orders.length > b.orders.length) {
          return -1;
        }
        if (a.orders.length < b.orders.length) {
          return 1;
        }
        return 0;
      })
      articles.rows = articles.rows.slice(offset, offset + limit);
      return articles;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Post('filter')
  async findAllWith(@Body() filter: any, @Query('size') limit: number, @Query('page') offset: number) {
    // try {
    if (offset !== 0) {
      offset = offset * limit;
    }
    let articles = await this.articleService.findAllWithFilter(filter, offset, limit);
    articles.rows = articles.rows.map((article) => {
      if (article.images.length > 0) {
        article.images = article?.images.sort((a, b) => b.id - a.id)
        .map(i => {
          i.image = process.env.BASE_URL_IMAGE + i.image;
          return i
        })
      }
      article.store.logo = (article.store.logo && article.store.logo !== 'none') ? process.env.BASE_URL_IMAGE + article.store.logo : null;
      return article;
    })
    return articles;
    // } catch (error) {
    //   throw new HttpException("Can't get articles", 500);
    // }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      var article = await this.articleService.findOne(+id);
      if (!article) throw new HttpException('Article not found', 404)
      article.images = article.images.sort((a, b) => b.id - a.id)
      .map(i => {
        i.image = process.env.BASE_URL_IMAGE + i.image;
        return i
      })
      return article;
    } catch (error) {
      throw new HttpException("Can't get articles", 500);
    }
  }

  @Get('/slug/:slug')
  async findOneBySlug(@Param('slug') slug: string) {
    try {
      var article = await this.articleService.findOneBySlug(slug);
      if (!article) throw new HttpException('Article not found', 404)
      article.images = article.images.sort((a, b) => b.id - a.id)
      .map(i => {
        i.image = process.env.BASE_URL_IMAGE + i.image;
        return i
      })
      article.store.logo = process.env.BASE_URL_IMAGE + article.store?.logo
      return article;
    } catch (error) {
      throw new HttpException("Can't get articles", 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: any,
    @User() user,
    @Res() response: Response,
  ) {

    // try {
    let article = await this.articleService.findOne(+id);
    if (article) {
      if (article.storeId !== user.storeId) {
        throw new ForbiddenException("You don't have permission");
      }

      return response
        .status(200)
        .json(await this.articleService.update(+id, updateArticleDto));
    }
    throw new HttpException('Aricle not found', 404);

  }

  @Delete('delete/:id')
  @Roles(Role.USER, Role.CONTROLLER, Role.SUPER_ADMIN, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async archive(
    @Param('id') id: number,
    @User() user,
    @Res() response: Response,
  ) {
    try {
      let article = await this.articleService.findOne(+id);
      if (article) {
        if (article.storeId !== user.storeId) {
          throw new ForbiddenException("You don't have permission");
        }
        return response
          .status(200)
          .json(await this.articleService.archive(+id));
      }
      throw new HttpException('Aricle not found', 404);
    } catch (error) {
      throw new HttpException("Can't update article", 500);
    }
  }

  @Put('publish/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard)
  async publishOrUnpublish(
    @Param('id') id: number,
    @Res() response: Response,
    @User() user,
  ) {
    try {
      let article = await this.articleService.findOne(+id);
      if (article) {
        if (article.get('owner') !== user.userId) {
          throw new ForbiddenException("You don't have permission");
        }
        return response.status(200).json(
          await this.articleService.update(id, {
            published: !article.get('published'),
          }),
        );
      }
      throw new HttpException('Article not found', 404);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }


}
