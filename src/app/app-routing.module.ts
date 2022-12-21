import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'client',
    loadChildren: () => import('./layouts/client/client.module').then(m => m.ClientPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./layouts/admin/admin.module').then(m => m.AdminPageModule)
  },
  {
    path: 'get-started',
    loadChildren: () => import('./pages/get-started/get-started.module').then(m => m.GetStartedPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
