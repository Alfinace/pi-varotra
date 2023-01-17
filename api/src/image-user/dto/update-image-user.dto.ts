import { CreateImageUserDto } from './create-image-user.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateImageUserDto extends PartialType(CreateImageUserDto) {}
