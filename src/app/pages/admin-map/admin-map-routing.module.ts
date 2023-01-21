import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminMapPage } from './admin-map.page';

const routes: Routes = [
  {
    path: '',
    component: AdminMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminMapPageRoutingModule {}
