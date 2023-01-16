import { PartialType } from '@nestjs/swagger';
import { CreateAricleOrderDto } from './create-aricle-order.dto';

export class UpdateAricleOrderDto extends PartialType(CreateAricleOrderDto) {}
