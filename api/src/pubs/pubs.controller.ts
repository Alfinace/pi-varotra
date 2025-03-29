import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Put } from '@nestjs/common';
import { PubsService } from './pubs.service';
import { CreatePubDto } from './dto/create-pub.dto';
import { UpdatePubDto } from './dto/update-pub.dto';

@Controller('pubs')
export class PubsController {
  constructor(private readonly pubsService: PubsService) { }

  @Post()
  async create(@Body() createPubDto: CreatePubDto) {
    try {
      var pub = await this.pubsService.create(createPubDto);
      if (pub) {
        var pub = await this.pubsService.findOne(pub.id);
        pub.image = pub.image ? process.env.BASE_URL_IMAGE + pub.image : '';
        return pub;
      }
    } catch (error) {
      throw new HttpException(error, 500);

    }
  }

  @Get()
  async findAll() {
    var pubs = await this.pubsService.findAll(0, 8);
    pubs.rows = pubs.rows.map(pub => {
      pub.image = pub.image ? process.env.BASE_URL_IMAGE + pub.image : '';
      return pub;
    });
    return pubs;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pubsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePubDto: UpdatePubDto) {
    return this.pubsService.update(+id, updatePubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pubsService.remove(+id);
  }
}
