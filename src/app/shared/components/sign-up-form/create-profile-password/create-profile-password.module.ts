import { CreateProfilePasswordComponent } from './create-profile-password.component';
import { CreateEmailComponent } from './../create-email/create-email.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [CreateProfilePasswordComponent],
  exports: [CreateProfilePasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule
  ]
})
export class CreateProfilePasswordModule { }
