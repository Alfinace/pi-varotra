import { IsNotEmpty } from "class-validator";

export class CreateArticleOrderDto {

  @IsNotEmpty()
  articleId: number;

  @IsNotEmpty()
  quantity: number

  @IsNotEmpty()
  unitPrice: number

  @IsNotEmpty()
  orderId: number
}
