import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchArticlePageRoutingModule } from './search-article-routing.module';

import { SearchArticlePage } from './search-article.page';
import { FilterSortingModule } from 'src/app/shared/components/modals/filter-sorting/filter-sorting.module';
import { ArticleModule } from 'src/app/shared/components/widgets/article/article.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchArticlePageRoutingModule,
    FilterSortingModule,
    ArticleModule
  ],
  declarations: [SearchArticlePage]
})
export class SearchArticlePageModule { }
