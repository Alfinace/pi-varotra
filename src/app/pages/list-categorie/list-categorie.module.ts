import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { IonicModule } from '@ionic/angular';

import { ListCategoriePageRoutingModule } from './list-categorie-routing.module';

import { ListCategoriePage } from './list-categorie.page';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AddCategorieModule } from 'src/app/shared/components/modals/add-categorie/add-categorie.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuModule,
    SliderModule,
    PaginatorModule,
    InputTextModule,
    ProgressBarModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    AddCategorieModule,
    DialogModule,
    ListCategoriePageRoutingModule
  ],
  declarations: [ListCategoriePage]
})
export class ListCategoriePageModule { }
