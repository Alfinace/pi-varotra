import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { ListUserPageRoutingModule } from './list-user-routing.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { PaginatorModule } from 'primeng/paginator';
import { ListUserPage } from './list-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuModule,
    SliderModule,
    PaginatorModule,
    InputTextModule,
    ProgressBarModule,
    TableModule,
    ListUserPageRoutingModule
  ],
  declarations: [ListUserPage]
})
export class ListUserPageModule { }
