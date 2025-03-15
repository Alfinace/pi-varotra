import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationStorePageRoutingModule } from './information-store-routing.module';

import { InformationStorePage } from './information-store.page';
import { ImageComponent } from 'src/app/shared/components/widgets/image/image.component';
import { ImageModule } from 'src/app/shared/components/widgets/image/image.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationStorePageRoutingModule,
    ReactiveFormsModule,
    ImageModule
  ],
  declarations: [InformationStorePage]
})
export class InformationStorePageModule {}
