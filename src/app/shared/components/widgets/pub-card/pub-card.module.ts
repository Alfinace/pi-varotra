import { IonicModule } from '@ionic/angular';
import { PubCardComponent } from './pub-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [PubCardComponent],
  exports: [PubCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class PubCardModule { }
