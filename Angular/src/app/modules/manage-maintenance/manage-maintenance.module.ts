import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManageMaintenanceRouteModule} from './manage-maintenance.route.module';
import {ManageMaintenanceComponent} from './manage-maintenance.component';

@NgModule({
  declarations: [
    ManageMaintenanceComponent
  ],
  imports: [
    CommonModule,
    ManageMaintenanceRouteModule
  ],
  exports: [
    ManageMaintenanceRouteModule
  ]
})
export class ManageMaintenanceModule {
}
