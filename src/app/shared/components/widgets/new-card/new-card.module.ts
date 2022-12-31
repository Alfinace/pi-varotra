import { NewCardComponent } from './new-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [NewCardComponent],
  exports: [NewCardComponent],
  imports: [
    CommonModule
  ]
})
export class NewCardModule { }
