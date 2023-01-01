import { FilterSortingComponent } from './filter-sorting.component';
import { IonicModule, IonProgressBar } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [FilterSortingComponent],
  exports: [FilterSortingComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class FilterSortingModule { }
