import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ArticleOrderService } from './article-order.service';
import { CreateArticleOrderDto } from './dto/create-article-order.dto';
import { UpdateAricleOrderDto } from './dto/update-article-order.dto';

@Controller('article-order')
export class ArticleOrderController {
  constructor(private readonly aricleOrderService: ArticleOrderService) {}

  @Post()
  create(@Body() createAricleOrderDto: CreateArticleOrderDto) {
    return this.aricleOrderService.create(createAricleOrderDto);
  }

  @Get()
  findAll() {
    return this.aricleOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aricleOrderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAricleOrderDto: UpdateAricleOrderDto,
  ) {
    return this.aricleOrderService.update(+id, updateAricleOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aricleOrderService.remove(+id);
  }
}
