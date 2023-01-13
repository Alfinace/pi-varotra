import { AddArticleComponent } from './add-article.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [AddArticleComponent],
  exports: [AddArticleComponent],
  imports: [
    CommonModule
  ]
})
export class AddArticleModule { }
