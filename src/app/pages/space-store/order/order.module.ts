import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { TransactionDetailsModule } from 'src/app/shared/components/widgets/transaction-details/transaction-details..module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    PaginatorModule,
    InputTextModule,
    ProgressBarModule,
    ToastModule,
    TableModule,
    TransactionDetailsModule
  ],
  declarations: [OrderPage, OrderDetailComponent]
})
export class OrderPageModule { }
