import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ArticleModule } from 'src/app/shared/components/widgets/article/article.module';
import { CommonModule } from '@angular/common';
import { DetailArticlePage } from './detail-article.page';
import { DetailArticlePageRoutingModule } from './detail-article-routing.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { SwiperModule } from 'swiper/angular';
import { TruncatePipeModule } from 'src/app/pipes/truncate.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SwiperModule,
    TruncatePipeModule,
    ArticleModule,
    DetailArticlePageRoutingModule,
    NgxIonicImageViewerModule

  ],
  declarations: [DetailArticlePage]
})
export class DetailArticlePageModule { }
