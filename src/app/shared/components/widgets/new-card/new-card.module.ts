import { NewCardComponent } from './new-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipeModule } from 'src/app/pipes/truncate.pipe.module';
import { NewDetailModule } from '../../modals/new-detail/new-detail.module';



@NgModule({
  declarations: [NewCardComponent],
  exports: [NewCardComponent],
  imports: [
    CommonModule,
    TruncatePipeModule,
    NewDetailModule
  ]
})
export class NewCardModule { }
