import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { IonicModule } from '@ionic/angular';
import { ArticleDetailModule } from '../../modals/article-detail/article-detail.module';
import { TruncatePipeModule } from 'src/app/pipes/truncate.pipe.module';



@NgModule({
  declarations: [ArticleComponent],
  exports: [ArticleComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ArticleDetailModule,
    TruncatePipeModule
  ]
})
export class ArticleModule { }
