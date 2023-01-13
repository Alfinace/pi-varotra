import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpaceStorePageRoutingModule } from './space-store-routing.module';

import { SpaceStorePage } from './space-store.page';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AddArticleModule } from 'src/app/shared/components/add-article/add-article.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpaceStorePageRoutingModule,
    SliderModule,
    PaginatorModule,
    InputTextModule,
    ProgressBarModule,
    ToastModule,
    TableModule,
    AddArticleModule
  ],
  declarations: [SpaceStorePage]
})
export class SpaceStorePageModule { }
