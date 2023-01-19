import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateNouveauDto {
	@IsNotEmpty()
	title: string;
	@IsOptional()
	image: string;
	@IsNotEmpty()
	detail: string;
	@IsNotEmpty()
	subtitle: string;
}
