import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListNewPageRoutingModule } from './list-new-routing.module';

import { ListNewPage } from './list-new.page';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { EditorModule } from 'primeng/editor';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AddNewModule } from 'src/app/shared/components/modals/add-new/add-new.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SliderModule,
    DynamicDialogModule,
    PaginatorModule,
    InputTextModule,
    ProgressBarModule,
    TableModule,
    AddNewModule,
    ListNewPageRoutingModule
  ],
  declarations: [ListNewPage]
})
export class ListNewPageModule { }
