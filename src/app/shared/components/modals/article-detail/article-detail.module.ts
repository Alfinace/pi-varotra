import { IonicModule } from '@ionic/angular';
import { ArticleDetailComponent } from './article-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { TruncatePipeModule } from 'src/app/pipes/truncate.pipe.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ArticleDetailComponent],
  exports: [ArticleDetailComponent],
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule,
    TruncatePipeModule,
    ReactiveFormsModule
  ]
})
export class ArticleDetailModule { }
