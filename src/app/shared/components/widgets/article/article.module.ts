import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { IonicModule } from '@ionic/angular';
import { ArticleDetailModule } from '../../modals/article-detail/article-detail.module';



@NgModule({
  declarations: [ArticleComponent],
  exports: [ArticleComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ArticleDetailModule
  ]
})
export class ArticleModule { }
