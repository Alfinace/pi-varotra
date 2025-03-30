import { NewCardModule } from './../../shared/components/widgets/new-card/new-card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { SwiperModule } from 'swiper/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { PubCardModule } from 'src/app/shared/components/widgets/pub-card/pub-card.module';
import { ArticleModule } from 'src/app/shared/components/widgets/article/article.module';
import { StoreCardModule } from 'src/app/shared/components/widgets/store-card/store-card.module';
import { NewDetailModule } from 'src/app/shared/components/modals/new-detail/new-detail.module';
import { CartModule } from 'src/app/shared/components/modals/cart/cart.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SwiperModule,
    CartModule,
    PubCardModule,
    NewCardModule,
    NewDetailModule,
    ArticleModule,
    StoreCardModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
