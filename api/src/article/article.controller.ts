import { ImageArticle } from 'src/image-article/entities/image-article.entity';
import { RoleGuard } from './../auth/role.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  UseGuards,
  ForbiddenException,
  Res,
} from '@nestjs/common';

import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Response } from 'express';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/auth/user.decorator';

@Controller('articles')
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
  async findAll(@Query('size') limit: number, @Query('page') offset: number) {
    try {
      var articles = await this.articleService.findAll(offset, limit);
      articles.rows = articles.rows.map((article) => {
        article.images = article.images.map(i => {
          i.image = process.env.BASE_URL_IMAGE + i.image;
          return i
        })
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
      var articles = await this.articleService.findAllByStore(user.storeId, offset, limit);
      articles.rows = articles.rows.map((article) => {
        console.log(article);

        article.images = article.images.map(i => {
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

  // @Get('user')
  // @UseGuards(JwtAuthGuard)
  // findAllByStore(@Query('size') limit: number, @Query('page') offset: number, @User() user) {
  //   try {
  //     return this.articleService.findAllByStore(user.storeId, offset, limit);
  //   } catch (error) {
  //     throw new HttpException("Can't get articles", 500);
  //   }
  // }

  @Get('store/:id')
  async findAllByStore(@Query('size') limit: number, @Query('page') offset: number, @Param('id') id: string) {
    try {
      let articles = await this.articleService.findAllByStore(id, offset, limit);
      articles.rows = articles.rows.map((article) => {
        article.images = article.images.map(i => {
          i.image = process.env.BASE_URL_IMAGE + i.image;
          return i
        })
        article.store.user.socialNetwork = JSON.parse(article.store.user.socialNetwork);
        article.store.logo = (article.store.logo && article.store.logo !== 'none') ? process.env.BASE_URL_IMAGE + article.store.logo : null;
        return article;
      })
      return articles;
    } catch (error) {
      throw new HttpException("Can't get articles", 500);
    }
  }

  @Post('filter')
  findAllWith(@Body() filter: any, @Query('size') limit: number, @Query('page') offset: number) {
    try {
      return this.articleService.findAllWithFilter(filter, offset, limit);
    } catch (error) {
      throw new HttpException("Can't get articles", 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      var article = await this.articleService.findOne(+id);
      if (!article) throw new HttpException('Article not found', 404)
      article.images = article.images.map(i => {
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
      article.images = article.images.map(i => {
        i.image = process.env.BASE_URL_IMAGE + i.image;
        return i
      })
      return article;
    } catch (error) {
      throw new HttpException("Can't get articles", 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: any,
    @User() user,
    @Res() response: Response,
  ) {
    console.log(user);

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
    // } catch (error) {
    //   throw new HttpException(error, 500);
    // }
  }

  // @Delete(':id')
  // @Roles(Role.USER)
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // async remove(
  //   @Param('id') id: string,
  //   @User() user,
  //   @Res() response: Response,
  // ) {
  //   try {
  //     let article = await this.articleService.findOne(+id);
  //     if (article) {
  //       if (article.get('owner') !== user.userId) {
  //         throw new ForbiddenException("You don't have permission");
  //       }
  //       return response.status(200).json(await this.articleService.remove(+id));
  //     }
  //     throw new HttpException('Aricle not found', 404);
  //   } catch (error) {
  //     throw new HttpException("Can't delete article", 500);
  //   }
  // }

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
        console.log(article);
        console.log(user);

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

  @Patch('publish/:id')
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
      console.log(error);

      throw new HttpException(error.message, 400);
    }
  }
}
