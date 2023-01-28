import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  totalAmount: number;

  @IsOptional()
  deliverieInfo: string;


  @IsNotEmpty()
  articles: { id: number; quantity: number; unitPrice: number, storeId: number, designation: string }[];
}
