import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpException, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/auth/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { PaymentU2AService } from 'src/payment-u2-a/payment-u2-a.service';
import { Response } from 'express';
import { PaymentA2UService } from 'src/payement-a2-u/payement-a2-u.service';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly paymentU2AService: PaymentU2AService,
    private readonly paymentA2UService: PaymentA2UService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() createOrderDto: CreateOrderDto, @User() user) {
    return this.orderService.create(createOrderDto, user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findAll(@User() user, @Query('size') limit: number, @Query('page') offset: number) {
    try {
      if (offset !== 0) {
        offset = offset * limit;
      }
      var orders = await this.orderService.findByStore(user.storeId, limit, offset);
      orders.rows = orders.rows.map(order => {
        order.deliverieInfo = JSON.parse(order.deliverieInfo) || null;
        order.articles = order.articles.map((article: any) => {
          return { ...article.ArticleOrder.dataValues, article: article };
        })
        return order;
      })
      return orders;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
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
    await this.paymentU2AService.approvePayment(paymentId).toPromise()
    let currentPayment = await this.paymentU2AService.getInfoPayment(paymentId).toPromise()
    console.log({
      piPaymentId: paymentId,
      txid: null,
      paid: false,
      cancelled: false,
      userId: user.userId,
      orderId: currentPayment.data.metadata.orderId,
    });

    let newPayment = await this.paymentU2AService.create({
      piPaymentId: paymentId,
      txid: null,
      paid: false,
      cancelled: false,
      userId: user.userId,
      orderId: currentPayment.data.metadata.orderId,
      metadata: JSON.stringify(currentPayment.data.metadata),
      amount: currentPayment.data.amount,
      uid: user.uid
    })
    await this.orderService.update(currentPayment.data.metadata.orderId, { paymentId: newPayment.id })
    return res.status(200).json({ message: `Approved the payment ${paymentId}` });
  }

  @Post('/payments/complete')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async complete(@Body('paymentId') paymentId: string, @Body('txid') txid: string, @Res() res: Response) {
    await this.paymentU2AService.completePayment(paymentId, txid).toPromise()
    this.paymentU2AService.update(paymentId, { txid, paid: true })
    //get payment info user to app
    let payment = await this.paymentU2AService.getPaymentU2A(paymentId)
    if (!payment) {
      return res.status(404).json({ message: `Not found payment ${paymentId}` });
    }
    let paymentA2U = this.paymentA2UService.create({
      memo: payment.memo,
      metadata: payment.metadata,
      amount: payment.amount,
      uid: payment.uid,
      orderId: payment.orderId,
    })

    return res.status(200).json({ message: `Complete the payment ${paymentId}`, payment: paymentA2U });
  }

  @Post('/payments/cancelled_payment')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async cancel(@Body('paymentId') paymentId: string, @Body('txid') txid: string, @Res() res: Response) {
    this.paymentU2AService.update(paymentId, { cancelled: true })
    return res.status(200).json({ message: `Complete the payment ${paymentId}` });
  }
}
