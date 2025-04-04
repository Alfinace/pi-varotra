import { AdminPage } from './layouts/admin/admin.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ClientPage } from './layouts/client/client.page';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
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
    canActivate: [AuthGuard],
    component: AdminPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin/admin.module').then(m => m.AdminPageModule)
      }
    ]
  },
  {
    path: 'checkout/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutPageModule)
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
  },
  {
    path: 'detail-article/:slug',
    loadChildren: () => import('./pages/detail-article/detail-article.module').then(m => m.DetailArticlePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
