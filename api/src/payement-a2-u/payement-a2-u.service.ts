import { Injectable } from '@nestjs/common';
import { CreatePayementA2UDto } from './dto/create-payement-a2-u.dto';
import { UpdatePayementA2UDto } from './dto/update-payement-a2-u.dto';

@Injectable()
export class PayementA2UService {
  create(createPayementA2UDto: CreatePayementA2UDto) {
    return 'This action adds a new payementA2U';
  }

  findAll() {
    return `This action returns all payementA2U`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payementA2U`;
  }

  update(id: number, updatePayementA2UDto: UpdatePayementA2UDto) {
    return `This action updates a #${id} payementA2U`;
  }

  remove(id: number) {
    return `This action removes a #${id} payementA2U`;
  }
}
