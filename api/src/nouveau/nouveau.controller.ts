import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException } from '@nestjs/common';
import { NouveauService } from './nouveau.service';
import { CreateNouveauDto } from './dto/create-nouveau.dto';
import { UpdateNouveauDto } from './dto/update-nouveau.dto';

@Controller('news')
export class NouveauController {
  constructor(private readonly nouveauService: NouveauService) { }

  @Post()
  create(@Body() createNouveauDto: CreateNouveauDto) {
    return this.nouveauService.create(createNouveauDto);
  }

  @Get()
  async findAll(@Query('size') limit: number, @Query('page') offset: number) {
    try {
      var nouveaux = await this.nouveauService.findAll(offset, limit);
      nouveaux.rows = nouveaux.rows.map((nouveau) => {
        nouveau.image = process.env.BASE_URL_IMAGE + nouveau.image;
        return nouveau;
      }
      )
      return nouveaux
    } catch (error) {
      throw new HttpException("Can't get nouveaux", 400);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nouveauService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNouveauDto: UpdateNouveauDto) {
    return this.nouveauService.update(+id, updateNouveauDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nouveauService.remove(+id);
  }
}
