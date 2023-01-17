import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';
import { CityService } from 'src/city/city.service';

@Controller('stores')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly cityService: CityService
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createStoreDto: CreateStoreDto,
    @User() user) {
    await this.cityService.findOne(createStoreDto.city).then(async (city) => {
      if (!city) {
        await this.cityService.create({ name: createStoreDto.city });
      }
    })
    return this.storeService.create({ ...createStoreDto, userId: user.userId });
  }

  @Get()
  async findAll(@Query('size') limit: number, @Query('page') offset: number) {
    if (limit && offset) {
      var stores = await this.storeService.findAll(limit, offset);
    } else {
      var stores = await this.storeService.findAll();
    }

    stores.rows = stores.rows.map((store) => {
      store.logo = store.logo ? process.env.BASE_URL_IMAGE + store.logo : '';
      store.user.avatar = process.env.BASE_URL_IMAGE + store.user.avatar;
      store.user.socialNetwork = JSON.parse(store.user.socialNetwork);
      return store;
    })

    return stores;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    await this.cityService.findOne(updateStoreDto.city).then(async (city) => {
      if (!city) {
        await this.cityService.create({ name: updateStoreDto.city });
      }
    })
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
