import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchArticlePage } from './search-article.page';

const routes: Routes = [
  {
    path: '',
    component: SearchArticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchArticlePageRoutingModule {}
