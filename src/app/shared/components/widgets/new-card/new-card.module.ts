import { NewCardComponent } from './new-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipeModule } from 'src/app/pipes/truncate.pipe.module';



@NgModule({
  declarations: [NewCardComponent],
  exports: [NewCardComponent],
  imports: [
    CommonModule,
    TruncatePipeModule
  ]
})
export class NewCardModule { }
