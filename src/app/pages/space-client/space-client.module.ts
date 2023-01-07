import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SpaceClientPageRoutingModule } from './space-client-routing.module';
import { SpaceClientPage } from './space-client.page';
import { CreateStoreModule } from 'src/app/shared/components/modals/create-store/create-store.module';
import { ParamsModule } from 'src/app/shared/components/modals/params/params.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpaceClientPageRoutingModule,
    ParamsModule,
    CreateStoreModule
  ],
  declarations: [SpaceClientPage]
})
export class SpaceClientPageModule { }
