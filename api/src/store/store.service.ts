import { Inject, Injectable } from '@nestjs/common';
import { City } from 'src/city/entities/city.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
import { Op } from 'sequelize';

@Injectable()
export class StoreService {
  constructor(
    @Inject('STORE_REPOSITORY')
    private readonly storeRepository: typeof Store,

    @Inject('CITY_REPOSITORY')
    private readonly cityRepository: typeof City,
  ) { }
  create(createStoreDto: CreateStoreDto) {
    return this.storeRepository.create({ ...createStoreDto });
  }

  findAll(offset: number, limit: number) {
    return this.storeRepository.findAndCountAll({
      include: [
        { all: true },
        {
          model: User,
          as: 'user',
        },
      ],
      where: { state: 'active'},
      limit,
      offset,
      distinct: true,
    });
  }

  findLocalization() {
    return this.storeRepository.findAndCountAll({
        attributes: ['id', 'lat', 'long', 'name', 'logo'],
        where: { state: 'active',longitude: { [Op.not]: null } , latitude: { [Op.not]: null } },
        distinct: true,
    });
  }

  findOne(id: number) {
    return this.storeRepository.findByPk(id, {
      include: [
        { all: true },
        {
          model: User,
          as: 'user',
        },
      ],
    });
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  updateByUserId(userId: number, data: any) {
    return this.storeRepository.update({ ...data }, {
      where: { userId },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
