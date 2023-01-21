import { AdminPage } from './layouts/admin/admin.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ClientPage } from './layouts/client/client.page';

const routes: Routes = [
  {
    path: 'client',
    component: ClientPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/client/client.module').then(m => m.ClientPageModule)
      }
    ]
  },
  {
    path: 'admin',
    component: AdminPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin/admin.module').then(m => m.AdminPageModule)
      }
    ]
  },
  {
    path: 'get-started',
    loadChildren: () => import('./pages/get-started/get-started.module').then(m => m.GetStartedPageModule)
  },
  {
    path: '',
    redirectTo: 'client',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./pages/new/new.module').then(m => m.NewPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
