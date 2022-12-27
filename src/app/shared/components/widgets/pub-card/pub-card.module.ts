import { PubCardComponent } from './pub-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [PubCardComponent],
  exports: [PubCardComponent],
  imports: [
    CommonModule,
  ]
})
export class PubCardModule { }
