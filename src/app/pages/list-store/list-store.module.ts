import { StoreCardModule } from './../../shared/components/widgets/store-card/store-card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';

import { IonicModule } from '@ionic/angular';

import { ListStorePageRoutingModule } from './list-store-routing.module';

import { ListStorePage } from './list-store.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkeletonModule,
    StoreCardModule,
    ListStorePageRoutingModule
  ],
  declarations: [ListStorePage]
})
export class ListStorePageModule { }
