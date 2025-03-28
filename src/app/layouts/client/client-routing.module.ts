import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../../pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'store',
    loadChildren: () => import('../../pages/store/store.module').then(m => m.StorePageModule)
  },
  {
    path: 'new',
    loadChildren: () => import('../../pages/new/new.module').then(m => m.NewPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('../../pages/search-article/search-article.module').then(m => m.SearchArticlePageModule)
  },
  {
    path: 'space-client',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../pages/space-client/space-client.module').then(m => m.SpaceClientPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPageRoutingModule { }
