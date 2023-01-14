import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCategoriePage } from './list-categorie.page';

const routes: Routes = [
  {
    path: '',
    component: ListCategoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCategoriePageRoutingModule {}
