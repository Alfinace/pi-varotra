import { IsNotEmpty, IsNumber, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateRateDto {
	@IsNotEmpty()
	@IsNumber()
	articleId: number;

	@IsNotEmpty()
	@IsNumber()
	@Min(1)
	@Max(5)
	rate: number;

	@IsNotEmpty()
	@MaxLength(255)
	comment: string;
}
