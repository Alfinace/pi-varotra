import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorePage } from './store.page';

const routes: Routes = [
  {
    path: '',
    component: StorePage,
  }
  ,
  {
    path: 'store-detail/:id',
    loadChildren: () => import('../../pages/store-detail/store-detail.module').then(m => m.StoreDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorePageRoutingModule { }
