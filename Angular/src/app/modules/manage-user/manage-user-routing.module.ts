import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ManageUserComponent} from './manage-user.component';
import {DriverDetailComponent} from './driver-detail/driver-detail.component';
import {WorkshopDetailComponent} from './workshop-detail/workshop-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ManageUserComponent
  },
  {
    path: 'driver-detail',
    component: DriverDetailComponent
  },
  {
    path: 'workshop-detail',
    component: WorkshopDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRoutingModule {
}
