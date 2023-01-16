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
import { AricleOrderService } from './aricle-order.service';
import { CreateAricleOrderDto } from './dto/create-aricle-order.dto';
import { UpdateAricleOrderDto } from './dto/update-aricle-order.dto';

@Controller('aricle-order')
export class AricleOrderController {
  constructor(private readonly aricleOrderService: AricleOrderService) {}

  @Post()
  create(@Body() createAricleOrderDto: CreateAricleOrderDto) {
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
