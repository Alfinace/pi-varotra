import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { AuthGuard } from 'src/app/guards/auth.guard';


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
  },
  {
    path: 'my-order',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../pages/my-order/my-order.module').then(m => m.MyOrderPageModule)
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children : [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
      ,
      {
        path: 'list-pub',
        loadChildren: () => import('../../pages/list-pub/list-pub.module').then(m => m.ListPubPageModule)
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
      },
      {
        path: 'admin-map',
        loadChildren: () => import('../../pages/admin-map/admin-map.module').then(m => m.AdminMapPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPageRoutingModule { }
