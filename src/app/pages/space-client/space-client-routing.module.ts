import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpaceClientPage } from './space-client.page';

const routes: Routes = [
  {
    path: '',
    component: SpaceClientPage,
  },
  {
    path: 'store',
    loadChildren: () => import('../../pages/space-store/space-store.module').then(m => m.SpaceStorePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaceClientPageRoutingModule { }
