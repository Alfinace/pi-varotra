import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListArticlePage } from './list-article.page';

const routes: Routes = [
  {
    path: '',
    component: ListArticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListArticlePageRoutingModule {}
