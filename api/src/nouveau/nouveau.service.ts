import { Inject, Injectable } from '@nestjs/common';
import { CreateNouveauDto } from './dto/create-nouveau.dto';
import { UpdateNouveauDto } from './dto/update-nouveau.dto';
import { Nouveau } from './entities/nouveau.entity';

@Injectable()
export class NouveauService {
  constructor(
    @Inject('NOUVEAU_REPOSITORY')
    private nouveauRepository: typeof Nouveau,
  ) { }
  create(createNouveauDto: CreateNouveauDto) {
    return this.nouveauRepository.create({ ...createNouveauDto });
  }

  findAll(offset: number, limit: number) {
    return this.nouveauRepository.findAndCountAll({
      offset,
      distinct: true,
      limit,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [
        {
          all: true,
        }
      ],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} nouveau`;
  }

  update(id: number, updateNouveauDto: UpdateNouveauDto) {
    return this.nouveauRepository.update({ ...updateNouveauDto }, { where: { id } });
  }

  remove(id: number) {
    return this.nouveauRepository.destroy({ where: { id } });
  }
}
