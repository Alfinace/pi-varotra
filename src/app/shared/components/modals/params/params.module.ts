import { SocialNetworkModule } from './../social-network/social-network.module';
import { EditProfileModule } from './../edit-profile/edit-profile.module';
import { ParamsComponent } from './params.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ParamsComponent],
  exports: [ParamsComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    EditProfileModule,
    SocialNetworkModule
  ]
})
export class ParamsModule { }
