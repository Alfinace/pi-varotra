import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategorieComponent } from './add-categorie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditorModule } from 'primeng/editor';



@NgModule({
  declarations: [AddCategorieComponent],
  exports: [AddCategorieComponent],
  imports: [
    CommonModule,
    IonicModule,
    EditorModule,
    ReactiveFormsModule,
  ]
})
export class AddCategorieModule { }
