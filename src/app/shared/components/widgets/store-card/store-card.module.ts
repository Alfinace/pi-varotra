import { IonicModule } from '@ionic/angular';
import { StoreCardComponent } from './store-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [StoreCardComponent],
  exports: [StoreCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class StoreCardModule { }
