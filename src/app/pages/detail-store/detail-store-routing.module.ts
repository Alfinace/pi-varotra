import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailStorePage } from './detail-store.page';

const routes: Routes = [
  {
    path: '',
    component: DetailStorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailStorePageRoutingModule {}
