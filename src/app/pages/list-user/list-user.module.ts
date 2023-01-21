import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { ListUserPageRoutingModule } from './list-user-routing.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { PaginatorModule } from 'primeng/paginator';
import { ListUserPage } from './list-user.page';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DetailUserInfoModule } from 'src/app/shared/components/modals/detail-user-info/detail-user-info.module';
@NgModule({
  imports: [
    CommonModule,
    DynamicDialogModule,
    IonicModule,
    MenuModule,
    SliderModule,
    PaginatorModule,
    InputTextModule,
    ProgressBarModule,
    TableModule,
    ListUserPageRoutingModule,
    DetailUserInfoModule
  ],
  declarations: [ListUserPage]
})
export class ListUserPageModule { }
