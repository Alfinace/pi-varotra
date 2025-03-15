import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationStorePage } from './information-store.page';

const routes: Routes = [
  {
    path: '',
    component: InformationStorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationStorePageRoutingModule {}
