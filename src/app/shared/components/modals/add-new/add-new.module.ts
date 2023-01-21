import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { AddNewComponent } from './add-new.component';



@NgModule({
  declarations: [AddNewComponent],
  exports: [AddNewComponent],
  imports: [
    CommonModule,
    IonicModule,
    EditorModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AddNewModule { }
