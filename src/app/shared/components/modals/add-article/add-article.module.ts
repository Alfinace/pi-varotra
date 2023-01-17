import { IonicModule } from '@ionic/angular';
import { AddArticleComponent } from './add-article.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { ImageModule } from '../../widgets/image/image.module';
import { LongPressModule } from 'ionic-long-press';


@NgModule({
  declarations: [AddArticleComponent],
  exports: [AddArticleComponent],
  imports: [
    CommonModule,
    EditorModule,
    LongPressModule,
    IonicModule,
    ReactiveFormsModule,
    ImageModule
  ]
})
export class AddArticleModule { }
