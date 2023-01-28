import { PartialType } from '@nestjs/swagger';
import { CreatePayementA2UDto } from './create-payement-a2-u.dto';

export class UpdatePayementA2UDto extends PartialType(CreatePayementA2UDto) {}
