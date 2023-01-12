import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListStorePage } from './list-store.page';

const routes: Routes = [
  {
    path: '',
    component: ListStorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListStorePageRoutingModule {}
