import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailArticlePageRoutingModule } from './detail-article-routing.module';

import { DetailArticlePage } from './detail-article.page';
import { TruncatePipeModule } from 'src/app/pipes/truncate.pipe.module';
import { SwiperModule } from 'swiper/angular';
import { ArticleModule } from 'src/app/shared/components/widgets/article/article.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SwiperModule,
    TruncatePipeModule,
    ArticleModule,
    DetailArticlePageRoutingModule
  ],
  declarations: [DetailArticlePage]
})
export class DetailArticlePageModule { }
