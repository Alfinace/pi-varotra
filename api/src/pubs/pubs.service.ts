import { Inject, Injectable } from '@nestjs/common';
import { CreatePubDto } from './dto/create-pub.dto';
import { UpdatePubDto } from './dto/update-pub.dto';
import { Pub } from './entities/pub.entity';

@Injectable()
export class PubsService {
  constructor(
    @Inject('PUB_REPOSITORY')
    private pubRepository: typeof Pub,
  ) { }
  create(createPubDto: CreatePubDto) {
    return this.pubRepository.create({ ...createPubDto });
  }

  findAll(offset: number, limit: number) {
    return this.pubRepository.findAndCountAll({
      offset,
      distinct: true,
      limit,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [
        {
          all: true
        },
      ],
    });
  }

  findOne(id: number) {
    return this.pubRepository.findOne({
      where: { id },
    }
    );
  }

  update(id: number, updatePubDto: UpdatePubDto) {
    return this.pubRepository.update({ ...updatePubDto }, { where: { id } });
  }

  remove(id: number) {
    return this.pubRepository.destroy({ where: { id } });
  }
}
