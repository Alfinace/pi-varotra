import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClientPageRoutingModule } from './client-routing.module';
import { ClientPage } from './client.page';
import { CartModule } from 'src/app/shared/components/modals/cart/cart.module';
import { FlyToCartModule } from 'src/app/shared/components/widgets/fly-to-cart/fly-to-cart.module';
import { TransactionDetailsModule } from 'src/app/shared/components/widgets/transaction-details/transaction-details..module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientPageRoutingModule,
    CartModule,
    FlyToCartModule,
    TransactionDetailsModule
  ],
  declarations: [ClientPage]
})
export class ClientPageModule { }
