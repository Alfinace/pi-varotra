import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminMapPageRoutingModule } from './admin-map-routing.module';

import { AdminMapPage } from './admin-map.page';
import { MapModule } from 'src/app/shared/components/widgets/map/map.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MapModule,
    IonicModule,
    AdminMapPageRoutingModule
  ],
  declarations: [AdminMapPage]
})
export class AdminMapPageModule { }
