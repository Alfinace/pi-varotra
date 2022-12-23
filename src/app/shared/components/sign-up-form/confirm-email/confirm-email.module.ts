import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmEmailComponent } from './confirm-email.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';



@NgModule({
  declarations: [ConfirmEmailComponent],
  exports: [ConfirmEmailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule,
    NgOtpInputModule
  ]
})
export class ConfirmEmailModule { }
