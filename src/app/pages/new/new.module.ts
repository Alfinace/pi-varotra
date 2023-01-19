import { NewCardModule } from './../../shared/components/widgets/new-card/new-card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPageRoutingModule } from './new-routing.module';

import { NewPage } from './new.page';
import { NewDetailModule } from 'src/app/shared/components/modals/new-detail/new-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPageRoutingModule,
    NewCardModule,
    NewDetailModule
  ],
  declarations: [NewPage]
})
export class NewPageModule { }
