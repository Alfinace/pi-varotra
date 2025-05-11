import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { ArticleService } from 'src/app/services/article.service';
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
  isLoading: boolean = false
  @Input() showDeliveryMark: boolean = false;
  constructor(
    private modal: ModalController,
    private articleService: ArticleService,
    private payementService: PaymentService,
  ) { }

  ngOnInit() {
    if(!this.order.paymentU2A?.txid) return
    this.isLoading = true
    this.payementService.getTransaction('transactions/'+this.order.paymentU2A.txid)
    .pipe(take(1)).subscribe((res: any) => {
      this.transaction = res
    }, ( error) =>{
      this.isLoading = false
    })
  }

  close() {
    this.modal.dismiss();
  }

  changeStatusOrder(){
    this.articleService.updateStatusOrder(this.order.paymentU2A.id).pipe(take(1)).subscribe((res: any) => {
    })
  }
}
