import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CreateStoreComponent } from './create-store.component';



@NgModule({
  declarations: [CreateStoreComponent],
  exports: [CreateStoreComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class CreateStoreModule { }
