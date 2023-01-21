import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'list-article',
    loadChildren: () => import('../../pages/list-article/list-article.module').then(m => m.ListArticlePageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('../../pages/list-new/list-new.module').then(m => m.ListNewPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('../../pages/list-user/list-user.module').then(m => m.ListUserPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../../pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'stores',
    loadChildren: () => import('../../pages/list-store/list-store.module').then(m => m.ListStorePageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('../../pages/list-categorie/list-categorie.module').then(m => m.ListCategoriePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule { }
