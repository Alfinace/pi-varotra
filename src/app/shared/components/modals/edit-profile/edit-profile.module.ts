import { IonicModule } from '@ionic/angular';
import { EditProfileComponent } from './edit-profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageModule } from '../../widgets/image/image.module';



@NgModule({
  declarations: [EditProfileComponent],
  exports: [EditProfileComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ImageModule
  ]
})
export class EditProfileModule { }
