import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/auth/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { PaymentU2AService } from 'src/payment-u2-a/payment-u2-a.service';
import { Response } from 'express';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly paymentService: PaymentU2AService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() createOrderDto: CreateOrderDto, @User() user) {
    return this.orderService.create(createOrderDto, user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }

  @Post('/payments/approve')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async approve(@Body('paymentId') paymentId: string, @User() user: any, @Res() res: Response) {
    console.log('paymentId', paymentId);

    await this.paymentService.approvePayment(paymentId).toPromise()
    let currentPayment = await this.paymentService.getInfoPayment(paymentId).toPromise()
    console.log(currentPayment);

    console.log(
      {
        piPaymentId: paymentId,
        txid: null,
        paid: false,
        cancelled: false,
        userId: user.userId,
        orderId: currentPayment.data.metadata.orderId,
      }
    );

    let newPayment = await this.paymentService.create({
      piPaymentId: paymentId,
      txid: null,
      paid: false,
      cancelled: false,
      userId: user.userId,
      orderId: currentPayment.data.metadata.orderId,
    })
    await this.orderService.update(currentPayment.data.metadata.orderId, { paymentId: newPayment.id })
    return res.status(200).json({ message: `Approved the payment ${paymentId}` });
  }

  @Post('/payments/complete')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async complete(@Body('paymentId') paymentId: string, @Body('txid') txid: string, @Res() res: Response) {
    this.paymentService.update(paymentId, { txid, paid: true })
    await this.paymentService.completePayment(paymentId, txid).toPromise()
    return res.status(200).json({ message: `Complete the payment ${paymentId}` });
  }

  @Post('/payments/cancelled_payment')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async cancel(@Body('paymentId') paymentId: string, @Body('txid') txid: string, @Res() res: Response) {
    this.paymentService.update(paymentId, { cancelled: true })
    return res.status(200).json({ message: `Complete the payment ${paymentId}` });
  }
}
