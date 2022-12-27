import { ArticleDetailComponent } from './article-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ArticleDetailComponent],
  exports: [ArticleDetailComponent],
  imports: [
    CommonModule
  ]
})
export class ArticleDetailModule { }
