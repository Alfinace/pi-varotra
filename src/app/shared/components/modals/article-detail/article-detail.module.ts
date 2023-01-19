import { IonicModule } from '@ionic/angular';
import { ArticleDetailComponent } from './article-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { ArticleModule } from 'src/app/shared/components/widgets/article/article.module';



@NgModule({
  declarations: [ArticleDetailComponent],
  exports: [ArticleDetailComponent],
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule,
    // ArticleModule
  ]
})
export class ArticleDetailModule { }
