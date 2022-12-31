import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ImageComponentComponentModule } from '../../image-component/image.component.module';

import { SocialNetworkComponent } from './social-network.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ImageComponentComponentModule,
  ],
  declarations: [SocialNetworkComponent],
  exports: [SocialNetworkComponent],
})
export class SocialNetworkComponentModule {}
