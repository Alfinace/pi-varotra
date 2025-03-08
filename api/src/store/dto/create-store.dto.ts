import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateStoreDto {
	@IsNotEmpty()
	name: string;
	@IsOptional()
	logo: string;
	@IsNotEmpty()
	address: string;
	@IsNotEmpty()
	city: string;
	@IsNotEmpty()
	contact: string;
	@IsOptional()
	deliveries: string;
	@IsOptional()
	userId: number;

  @IsOptional()
  description: string
}
