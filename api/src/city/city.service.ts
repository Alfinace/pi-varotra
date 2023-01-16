import { Inject, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @Inject('CITY_REPOSITORY')
    private cityRepository: typeof City,
  ) { }
  create(createCityDto: CreateCityDto) {
    return this.cityRepository.create({ ...createCityDto });
  }

  findAll() {
    return this.cityRepository.findAll({
      order: [['name', 'ASC']],
    });
  }

  findOne(name: string) {
    return this.cityRepository.findOne({
      where: { name },
    });
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
