import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpException,
  HttpStatus,
  Put,
  Res,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';
import { CityService } from 'src/city/city.service';
import { RoleGuard } from 'src/auth/role.guard';
import { PaymentU2AService } from 'src/payment-u2-a/payment-u2-a.service';
import { Response } from 'express';

@Controller('stores')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly cityService: CityService,
    private readonly paymentU2AService: PaymentU2AService,
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createStoreDto: CreateStoreDto, @User() user) {
    try {
      await this.cityService.findOne(createStoreDto.city).then(async (city) => {
        if (!city) {
          await this.cityService.create({ name: createStoreDto.city });
        }
      });
      return this.storeService.create({
        ...createStoreDto,
        userId: user.userId,
      });
    } catch (error) {
      // throw new Http
    }
  }

  @Get()
  async findAll(@Query('size') limit: number, @Query('page') offset: number) {
    try {
      if (offset !== 0) {
        offset = offset * limit;
      }
      // offset = isNaN(offset) ? offset : 0;
      // limit = isNaN(limit) ? limit : 10;
      const stores = await this.storeService.findAll(offset, limit);
      stores.rows = stores.rows.map((store) => {
        store.logo =
          store.logo && store.logo !== 'none'
            ? process.env.BASE_URL_IMAGE + store.logo
            : null;
        store.user.avatar = process.env.BASE_URL_IMAGE + store.user.avatar;
        store.articles = store.articles.filter((a) => !a.archived);
        return store;
      });

      return stores;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const store = await this.storeService.findOne(+id);
    store.logo =
      store.logo && store.logo !== 'none'
        ? process.env.BASE_URL_IMAGE + store.logo
        : null;
    store.user.avatar = process.env.BASE_URL_IMAGE + store.user.avatar;
    store.articles = store.articles.filter((a) => !a.archived);
    return store;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    await this.cityService.findOne(updateStoreDto.city).then(async (city) => {
      if (!city) {
        await this.cityService.create({ name: updateStoreDto.city });
      }
    });
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }

  @Post('/payments/approve')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async approve(
    @Body('paymentId') paymentId: string,
    @User() user: any,
    @Res() res: Response,
  ) {
    await this.paymentU2AService.approvePayment(paymentId).toPromise();
    const currentPayment = await this.paymentU2AService
      .getInfoPayment(paymentId)
      .toPromise();
    const newPayment = await this.paymentU2AService.create({
      piPaymentId: paymentId,
      txid: null,
      paid: false,
      cancelled: false,
      userId: user.userId,
      orderId: currentPayment.data.metadata.orderId,
      memo: currentPayment.data.memo,
      metadata: JSON.stringify(currentPayment.data.metadata),
      amount: currentPayment.data.amount,
      uid: user.uid,
    });
    return res
      .status(200)
      .json({ message: `Approved the payment ${paymentId}` });
  }

  @Post('/payments/complete')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async complete(
    @Body('paymentId') paymentId: string,
    @Body('txid') txid: string,
    @Res() res: Response,
  ) {
    await this.paymentU2AService.completePayment(paymentId, txid).toPromise();
    this.paymentU2AService.update(paymentId, { txid, paid: true });
    //get payment info user to app
    const payment = await this.paymentU2AService.getPaymentU2A(paymentId);
    if (!payment) {
      return res
        .status(404)
        .json({ message: `Not found payment ${paymentId}` });
    }
    return res
      .status(200)
      .json({ message: `Complete the payment ${paymentId}` });
  }

  @Post('/payments/cancelled_payment')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async cancel(
    @Body('paymentId') paymentId: string,
    @Body('txid') txid: string,
    @Res() res: Response,
  ) {
    this.paymentU2AService.update(paymentId, { cancelled: true });
    return res
      .status(200)
      .json({ message: `Complete the payment ${paymentId}` });
  }
}
