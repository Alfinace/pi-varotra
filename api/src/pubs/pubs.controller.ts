import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PubsService } from './pubs.service';
import { CreatePubDto } from './dto/create-pub.dto';
import { UpdatePubDto } from './dto/update-pub.dto';

@Controller('pubs')
export class PubsController {
  constructor(private readonly pubsService: PubsService) { }

  @Post()
  create(@Body() createPubDto: CreatePubDto) {
    return this.pubsService.create(createPubDto);
  }

  @Get()
  findAll() {
    return this.pubsService.findAll(0, 8);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pubsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePubDto: UpdatePubDto) {
    return this.pubsService.update(+id, updatePubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pubsService.remove(+id);
  }
}
