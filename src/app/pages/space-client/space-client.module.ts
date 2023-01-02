import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpaceClientPageRoutingModule } from './space-client-routing.module';

import { SpaceClientPage } from './space-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpaceClientPageRoutingModule
  ],
  declarations: [SpaceClientPage]
})
export class SpaceClientPageModule {}