import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LandingComponent} from './modules/landing/landing.component';
import {AuthGuard} from './core/guard/auth.guard';
import {NoGuard} from './core/guard/no.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [NoGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    canActivate: [NoGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-asset',
    loadChildren: () => import('./modules/manage-asset/manage-asset.module').then(m => m.ManageAssetModule),
    canActivate: [AuthGuard],
    data: {role: 'Admin'}
  },
  {
    path: 'manage-user',
    loadChildren: () => import('./modules/manage-user/manage-user.module').then(m => m.ManageUserModule),
    canActivate: [AuthGuard],
    data: {role: 'Admin'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouteModule {
}
