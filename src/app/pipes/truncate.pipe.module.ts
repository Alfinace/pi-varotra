import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  imports: [],
  declarations: [TruncatePipe],
  exports: [TruncatePipe],
})
export class TruncatePipeModule { }
