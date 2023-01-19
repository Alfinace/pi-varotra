import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NewDetailComponent } from './new-detail.component';



@NgModule({
  declarations: [NewDetailComponent],
  exports: [NewDetailComponent],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class NewDetailModule { }
