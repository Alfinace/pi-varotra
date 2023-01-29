import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailArticlePage } from './detail-article.page';

const routes: Routes = [
  {
    path: '',
    component: DetailArticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailArticlePageRoutingModule {}
