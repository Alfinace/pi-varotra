import { SignUpFormModule } from './../../shared/components/sign-up-form/sign-up-form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpFormModule,
    SignUpPageRoutingModule
  ],
  declarations: [SignUpPage]
})
export class SignUpPageModule { }
