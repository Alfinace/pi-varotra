import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpaceStorePageRoutingModule } from './space-store-routing.module';

import { SpaceStorePage } from './space-store.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpaceStorePageRoutingModule
  ],
  declarations: [SpaceStorePage]
})
export class SpaceStorePageModule {}
