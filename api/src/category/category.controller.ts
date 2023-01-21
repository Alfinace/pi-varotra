import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from './../auth/role.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpException,
  Res,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return this.categoryService.create(createCategoryDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(@Query('size') limit: number, @Query('page') offset: number) {
    console.log(limit, offset);
    if (limit > -1 && offset > -1) {
      var stores = await this.categoryService.findAll((offset + 1) * limit - limit, limit);
    } else {
      var stores = await this.categoryService.findAll();
    }

    // stores.rows = stores.rows.map((user) => {
    //   user.socialNetwork = JSON.parse(user.socialNetwork);
    //   user.avatar = process.env.BASE_URL_IMAGE + user.avatar;
    //   user.images.map((image) => {
    //     image.filename = process.env.BASE_URL_IMAGE + image.filename;
    //     return image;
    //   });
    //   return user;
    // })

    return stores;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
