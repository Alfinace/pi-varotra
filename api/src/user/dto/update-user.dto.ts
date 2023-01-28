import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  gender: string;
  @IsOptional()
  firstname: string;
  @IsOptional()
  lastname: string;
  @IsOptional()
  birthday: Date;
  @IsOptional()
  address: string;
  @IsOptional()
  city: string;
  @IsOptional()
  avatar: string;
  @IsOptional()
  contact: string;
  @IsOptional()
  postalCode: string;
  @IsOptional()
  socialNetwork: string;
  // @IsOptional()
  // publicKey: string;
}
