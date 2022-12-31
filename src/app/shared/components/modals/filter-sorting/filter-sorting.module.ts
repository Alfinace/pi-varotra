import { FilterSortingComponent } from './filter-sorting.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FilterSortingComponent],
  exports: [FilterSortingComponent],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class FilterSortingModule { }
