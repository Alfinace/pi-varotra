import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StoreCardComponent } from './store-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [StoreCardComponent],
  exports: [StoreCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class StoreCardModule { }
