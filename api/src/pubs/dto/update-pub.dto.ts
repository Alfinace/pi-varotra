import { PartialType } from '@nestjs/swagger';
import { CreatePubDto } from './create-pub.dto';

export class UpdatePubDto extends PartialType(CreatePubDto) {}
