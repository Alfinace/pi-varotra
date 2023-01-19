import { PartialType } from '@nestjs/swagger';
import { CreateNouveauDto } from './create-nouveau.dto';

export class UpdateNouveauDto extends PartialType(CreateNouveauDto) {}
