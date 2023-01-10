import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListUserPage } from './list-user.page';

const routes: Routes = [
  {
    path: '',
    component: ListUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListUserPageRoutingModule {}
