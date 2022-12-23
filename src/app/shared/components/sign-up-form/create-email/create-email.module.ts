import { ConditionTermModule } from './../../modals/condition-term/condition-term.module';
import { CreateEmailComponent } from './create-email.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CreateEmailComponent],
  exports: [CreateEmailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule,
    RouterModule,
    ConditionTermModule
  ]
})
export class CreateEmailModule { }
