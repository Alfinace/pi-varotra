import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListNewPage } from './list-new.page';

const routes: Routes = [
  {
    path: '',
    component: ListNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListNewPageRoutingModule {}
