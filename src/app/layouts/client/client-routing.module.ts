import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('../../pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'store',
    loadChildren: () => import('../../pages/store/store.module').then(m => m.StorePageModule)
  },
  {
    path: 'store-detail',
    loadChildren: () => import('../../pages/store-detail/store-detail.module').then(m => m.StoreDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPageRoutingModule { }
