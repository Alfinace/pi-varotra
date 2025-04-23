import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { PaymentService } from 'src/app/services/payment.service';
import { TransactionPinework } from 'src/app/types/TransactionPinetwork';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  @Input() order: any;
  transaction: TransactionPinework
  constructor(
    private modal: ModalController,
    private payementService: PaymentService
  ) { }

  ngOnInit() {
    this.payementService.getTransaction('transactions/'+this.order.paymentU2A.txid).pipe(take(1)).subscribe((res: any) => {
      this.transaction = res
    })
  }

  close() {
    this.modal.dismiss();
  }
}
