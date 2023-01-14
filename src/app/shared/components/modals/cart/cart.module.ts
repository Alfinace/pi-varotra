import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [CartComponent],
  exports: [CartComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class CartModule { }
