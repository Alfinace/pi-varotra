import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpException, Query, UseInterceptors, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/auth/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { PaymentU2AService } from 'src/payment-u2-a/payment-u2-a.service';
import { Response } from 'express';
import { PaymentA2UService } from 'src/payement-a2-u/payement-a2-u.service';
import { UserInterceptor } from 'src/auth/user.interceptor';

@Controller('orders')
@UseInterceptors(UserInterceptor)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly paymentU2AService: PaymentU2AService,
    private readonly paymentA2UService: PaymentA2UService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(@Body() createOrderDto: CreateOrderDto, @User() user, @Res() res: Response) {
    try {
      const order =  await this.orderService.create(createOrderDto, user.userId);
      return res.status(200).json({ order, message: 'Order created successfully' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findAll(@User() user, @Query('size') limit: number, @Query('page') offset: number) {
    try {
      if (offset !== 0) {
        offset = offset * limit;
      }
      console.log(user);

      var orders = await this.orderService.findByStore(user.storeId, limit, offset);
      orders.rows = orders.rows.map(order => {
        const deliverieInfo =JSON.parse(order.deliverieInfo ) || null
        order.deliverieInfo = deliverieInfo;
        order.articles = order.articles.map((article: any) => {
          return { ...article.ArticleOrder.dataValues, article: article };
        })
        return order;
      })
      return orders;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, 500);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Put(':id')
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
    let newPayment = await this.paymentU2AService.create({
      piPaymentId: paymentId,
      txid: null,
      paid: false,
      cancelled: false,
      userId: user.userId,
      orderId: currentPayment.data.metadata.orderId,
      memo: currentPayment.data.memo,
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
    const ownerStore = await this.orderService.findOwnerStoreByOrderId(payment.orderId)
    let paymentA2U = await this.paymentA2UService.create({
      memo: payment.memo,
      metadata: payment.metadata,
      amount: payment.amount,
      uid: ownerStore.store.user.uid,
      orderId: payment.orderId,
    })
    let final = await this.orderService.updateStock(payment.orderId)
    return res.status(200).json({ message: `Complete the payment ${paymentId}`, payment: paymentA2U, final });
  }

  @Post('/payments/cancelled_payment')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async cancel(@Body('paymentId') paymentId: string, @Body('txid') txid: string, @Res() res: Response) {
    this.paymentU2AService.update(paymentId, { cancelled: true })
    return res.status(200).json({ message: `Complete the payment ${paymentId}` });
  }
}
