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
    path: 'manage-vehicle',
    loadChildren: () => import('./modules/manage-vehicle/manage-vehicle.module').then(m => m.ManageVehicleModule),
    canActivate: [AuthGuard],
    data: {role: 'Admin'}
  },
  {
    path: 'manage-user',
    loadChildren: () => import('./modules/manage-user/manage-user.module').then(m => m.ManageUserModule),
    canActivate: [AuthGuard],
    data: {role: 'Admin'}
  },
  {
    path: 'manage-task',
    loadChildren: () => import('./modules/manage-task/manage-task.module').then(m => m.ManageTaskModule),
    canActivate: [AuthGuard],
    data: {role: 'Admin'}
  },
  {
    path: 'manage-maintenance',
    loadChildren: () => import('./modules/manage-maintenance/manage-maintenance.module').then(m => m.ManageMaintenanceModule),
    canActivate: [AuthGuard],
    data: {role: 'Admin'}
  },
  {
    path: 'manage-cost',
    loadChildren: () => import('./modules/manage-cost/manage-cost.module').then(m => m.ManageCostModule),
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
