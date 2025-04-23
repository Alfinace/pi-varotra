import { TransactionDetailsComponent } from './transaction-details.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [
    CommonModule,IonicModule,
    ClipboardModule,
  ],
  declarations: [TransactionDetailsComponent],
  exports: [TransactionDetailsComponent],
})
export class TransactionDetailsModule { }
