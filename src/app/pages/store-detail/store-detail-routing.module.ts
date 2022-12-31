import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreDetailPage } from './store-detail.page';

const routes: Routes = [
  {
    path: '',
    component: StoreDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreDetailPageRoutingModule {}
