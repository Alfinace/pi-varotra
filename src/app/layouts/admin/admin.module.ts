import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AdminPage } from './admin.page';
import { DashboardPageModule } from 'src/app/pages/dashboard/dashboard.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    DashboardPageModule,
    MatSidenavModule
  ],
  declarations: [AdminPage]
})
export class AdminPageModule { }
