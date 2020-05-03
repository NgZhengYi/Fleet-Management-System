import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ManageMaintenanceComponent} from './manage-maintenance.component';
import {NewMaintenanceComponent} from './new-maintenance/new-maintenance.component';
import {MaintenanceHistoryComponent} from './maintenance-history/maintenance-history.component';

const routes: Routes = [
  {
    path: '',
    component: ManageMaintenanceComponent
  },
  {
    path: 'new-maintenance',
    component: NewMaintenanceComponent
  },
  {
    path: 'maintenance-history',
    component: MaintenanceHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageMaintenanceRouteModule {
}
