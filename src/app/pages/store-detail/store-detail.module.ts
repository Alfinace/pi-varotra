import { ArticleModule } from 'src/app/shared/components/widgets/article/article.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreDetailPageRoutingModule } from './store-detail-routing.module';

import { StoreDetailPage } from './store-detail.page';
import { MapModule } from 'src/app/shared/components/widgets/map/map.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreDetailPageRoutingModule,
    ArticleModule,
    MapModule
  ],
  declarations: [StoreDetailPage]
})
export class StoreDetailPageModule { }
