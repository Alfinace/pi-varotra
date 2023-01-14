import { DetailUserInfoComponent } from 'src/app/shared/components/modals/detail-user-info/detail-user-info.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';


@NgModule({
  declarations: [DetailUserInfoComponent],
  exports: [DetailUserInfoComponent],
  imports: [
    CommonModule,
    IonicModule,
    ImageModule
  ]
})
export class DetailUserInfoModule { }
