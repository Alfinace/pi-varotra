import { IsOptional, IsNotEmpty } from "class-validator";

export class CreateImageUserDto {
	@IsNotEmpty()
	filename: string;
	@IsNotEmpty()
	name: string;
	@IsNotEmpty()
	type: string;
	@IsOptional()
	userId?: number;
	@IsOptional()
	storeId?: number;
}
