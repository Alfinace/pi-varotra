import { StoreCardModule } from 'src/app/shared/components/widgets/store-card/store-card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminPageRoutingModule } from './admin-routing.module';
import { AdminPage } from './admin.page';
import { DashboardPageModule } from 'src/app/pages/dashboard/dashboard.module';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    DashboardPageModule,
    TieredMenuModule,
    RouterModule,
    StoreCardModule
  ],
  declarations: [AdminPage]
})
export class AdminPageModule { }
