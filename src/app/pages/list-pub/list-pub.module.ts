import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPubPageRoutingModule } from './list-pub-routing.module';

import { ListPubPage } from './list-pub.page';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'src/app/shared/components/widgets/image/image.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginatorModule,
    InputTextModule,
    ProgressBarModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    DialogModule,
    ImageModule,
    IonicModule,
    ListPubPageRoutingModule
  ],
  declarations: [ListPubPage]
})
export class ListPubPageModule { }
