import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ManageMaintenanceComponent} from './manage-maintenance.component';
import {NewMaintenanceComponent} from './new-maintenance/new-maintenance.component';
import {UpdateMaintenanceComponent} from './update-maintenance/update-maintenance.component';
import {HistoryMaintenanceComponent} from './history-maintenance/history-maintenance.component';

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
    path: 'update-maintenance',
    component: UpdateMaintenanceComponent
  },
  {
    path: 'history-maintenance',
    component: HistoryMaintenanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageMaintenanceRouteModule {
}
