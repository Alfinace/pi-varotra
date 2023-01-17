import { PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';

export class UpdatePaymnetDto extends PartialType(CreatePaymentDto) {}
