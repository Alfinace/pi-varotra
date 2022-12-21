import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetStartedPageRoutingModule } from './get-started-routing.module';

import { GetStartedPage } from './get-started.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetStartedPageRoutingModule
  ],
  declarations: [GetStartedPage]
})
export class GetStartedPageModule {}
