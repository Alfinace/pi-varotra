import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { SwiperModule } from 'swiper/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { PubCardModule } from 'src/app/shared/components/widgets/pub-card/pub-card.module';
import { ArticleModule } from 'src/app/shared/components/widgets/article/article.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SwiperModule,
    PubCardModule,
    ArticleModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
