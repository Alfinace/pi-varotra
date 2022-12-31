import { ConditionTermComponent } from './condition-term.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ConditionTermComponent],
  exports: [ConditionTermComponent],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class ConditionTermModule { }
