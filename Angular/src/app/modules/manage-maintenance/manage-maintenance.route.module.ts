import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ManageMaintenanceComponent} from './manage-maintenance.component';

const routes: Routes = [
  {
    path: '',
    component: ManageMaintenanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageMaintenanceRouteModule {
}
