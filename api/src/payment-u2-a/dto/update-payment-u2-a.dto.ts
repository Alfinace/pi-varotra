import { PartialType } from '@nestjs/swagger';
import { CreatePaymentU2ADto } from './create-payment-u2-a.dto';

export class UpdatePaymentU2ADto extends PartialType(CreatePaymentU2ADto) { }
