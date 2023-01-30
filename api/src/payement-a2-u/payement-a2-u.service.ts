import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import PiNetwork from 'pi-backend';
import { catchError, map } from 'rxjs';
import { CreatePayementA2UDto } from './dto/create-payement-a2-u.dto';
import { UpdatePayementA2UDto } from './dto/update-payement-a2-u.dto';
import { PayementA2U } from './entities/payement-a2-u.entity';

@Injectable()
export class PaymentA2UService {
  private pi: any;
  constructor(
    @Inject('PAYMENTA2U_REPOSITORY')
    private paymentA2URepository: typeof PayementA2U,
    private httpService: HttpService,
  ) {
    const apiKey = process.env.API_KEY_MINEPI;
    const walletPrivatedSeed = process.env.WALLET_PRIVATE_SEED;
    this.pi = new PiNetwork(apiKey, walletPrivatedSeed);
  }
  create(data: any) {
    return new Promise((resolve, reject) => {
      this.paymentA2URepository.create(data).then(async res => {
        if (!res) reject('Error created data payment in database')
        let paymentId = await this.pi.createPayment(
          {
            uid: data.uid,
            memo: data.memo,
            metadata: data.metadata,
            amount: data.amount
          }
        )
        if (paymentId) {
          await this.update(res.id, paymentId)
          const txid = await this.pi.submitPayment(paymentId);
          await this.update(res.id, txid)
          const completedPayment = await this.pi.completePayment(paymentId, txid);
          resolve(completedPayment)
        } else {
          resolve('Create payment failed')
        }
      })
    });
  }

  update(id: number, data) {
    return this.paymentA2URepository.update(data, { where: { id } })
  }
}
