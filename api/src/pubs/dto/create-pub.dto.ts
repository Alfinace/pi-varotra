import { IsNotEmpty, IsOptional } from "class-validator";

export class CreatePubDto {

	@IsNotEmpty()
	image: string;

	@IsOptional()
	link: string;
}
