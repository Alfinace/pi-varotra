import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TruncatePipeModule } from 'src/app/pipes/truncate.pipe.module';



@NgModule({
  declarations: [CartComponent],
  exports: [CartComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruncatePipeModule,
    RouterModule
  ]
})
export class CartModule { }
