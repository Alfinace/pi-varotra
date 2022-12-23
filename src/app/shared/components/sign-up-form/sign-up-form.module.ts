import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SignUpFormComponent } from './sign-up-form.component';
import { CreateProfilePasswordModule } from './create-profile-password/create-profile-password.module';
import { ConfirmEmailModule } from './confirm-email/confirm-email.module';
import { CreateEmailModule } from './create-email/create-email.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [SignUpFormComponent],
  exports: [SignUpFormComponent],
  imports: [
    CommonModule,
    CreateEmailModule,
    RouterModule,
    IonicModule,
    ConfirmEmailModule,
    CreateProfilePasswordModule
  ]
})
export class SignUpFormModule { }
