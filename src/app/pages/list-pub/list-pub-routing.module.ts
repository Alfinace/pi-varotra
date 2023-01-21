import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPubPage } from './list-pub.page';

const routes: Routes = [
  {
    path: '',
    component: ListPubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPubPageRoutingModule {}
