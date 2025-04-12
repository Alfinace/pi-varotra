import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateStoreDto } from './create-store.dto';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
	@IsOptional()
	images: { type: string, url: string }[];

  @IsOptional()
  piPaiementId: string
}
