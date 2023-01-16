import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  totalAmonut: number;

  @IsNotEmpty()
  articles: { id: number; quantite: number; unitPrice: number }[];
}
