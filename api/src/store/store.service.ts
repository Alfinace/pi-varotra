import { Inject, Injectable } from '@nestjs/common';
import { City } from 'src/city/entities/city.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @Inject('STORE_REPOSITORY')
    private readonly storeRepository: typeof Store,

    @Inject('CITY_REPOSITORY')
    private readonly cityRepository: typeof City,) { }
  create(createStoreDto: CreateStoreDto) {

    this.storeRepository.create({ ...createStoreDto });
  }

  findAll(offset: number = 0, limit: number = 10) {
    return this.storeRepository.findAndCountAll({
      include: [
        { all: true },
        {
          model: User,
          as: 'user',
          attributes: ['address', 'avatar', 'contact', 'firstname', 'lastname', 'socialNetwork']
        }
      ],
      limit,
      offset,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
