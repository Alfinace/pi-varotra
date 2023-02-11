import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpaceStorePage } from './space-store.page';

const routes: Routes = [
  {
    path: '',
    component: SpaceStorePage
  },  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaceStorePageRoutingModule {}
