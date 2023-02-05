import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpException, HttpStatus } from '@nestjs/common';
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
    try {
      await this.cityService.findOne(createStoreDto.city).then(async (city) => {
        if (!city) {
          await this.cityService.create({ name: createStoreDto.city });
        }
      })
      return this.storeService.create({ ...createStoreDto, userId: user.userId });
    } catch (error) {
      // throw new Http

    }
  }

  @Get()
  async findAll(@Query('size') limit: number, @Query('page') offset: number) {
    try {
      if (offset !== 0) {
        offset = offset * limit;
      }
      // offset = isNaN(offset) ? offset : 0;
      // limit = isNaN(limit) ? limit : 10;
      var stores = await this.storeService.findAll(offset, limit);
      stores.rows = stores.rows.map((store) => {
        store.logo = (store.logo && store.logo !== 'none') ? process.env.BASE_URL_IMAGE + store.logo : null;
        store.user.avatar = process.env.BASE_URL_IMAGE + store.user.avatar;
        store.user.socialNetwork = JSON.parse(store.user.socialNetwork);
        store.articles = store.articles.filter(a => !a.archived)
        return store;
      })

      return stores;
    } catch (error) {
      console.log(error)
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let store = await this.storeService.findOne(+id);
    store.logo = (store.logo && store.logo !== 'none') ? process.env.BASE_URL_IMAGE + store.logo : null;
    store.user.avatar = process.env.BASE_URL_IMAGE + store.user.avatar;
    store.user.socialNetwork = JSON.parse(store.user.socialNetwork);
    store.articles = store.articles.filter(a => !a.archived)
    return store
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
