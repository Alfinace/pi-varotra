import { Inject, Injectable } from '@nestjs/common';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { Rate } from './entities/rate.entity';

@Injectable()
export class RatesService {
  constructor(
    @Inject('RATE_REPOSITORY')
    private rateRepository: typeof Rate,
  ) { }
  create(createRateDto: CreateRateDto) {
    return this.rateRepository.create({ ...createRateDto });
  }

  findAll() {
    // return this.rateRepository.find
  }

  findOne(id: number) {
    return `This action returns a #${id} rate`;
  }

  update(id: number, updateRateDto: UpdateRateDto) {
    return this.rateRepository.update({ ...updateRateDto }, { where: { id } });
  }

  remove(id: number) {
    return this.rateRepository.destroy({ where: { id } });
  }
}
