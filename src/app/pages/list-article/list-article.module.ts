import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListArticlePageRoutingModule } from './list-article-routing.module';

import { ListArticlePage } from './list-article.page';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    IonicModule,
    ListArticlePageRoutingModule
  ],
  declarations: [ListArticlePage]
})
export class ListArticlePageModule { }
