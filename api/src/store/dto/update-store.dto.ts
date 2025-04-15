import { CreateStoreDto } from './create-store.dto';
import { IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  @IsOptional()
  images: { type: string; url: string }[];

  @IsOptional()
  piPaymentId: string;
}
