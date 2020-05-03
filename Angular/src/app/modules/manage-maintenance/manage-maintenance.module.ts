import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';

import {AppAntModule} from '../../app.ant.module';
import {ManageMaintenanceRouteModule} from './manage-maintenance.route.module';
import {ManageMaintenanceComponent} from './manage-maintenance.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {NewMaintenanceComponent} from './new-maintenance/new-maintenance.component';
import {MaintenanceHistoryComponent} from './maintenance-history/maintenance-history.component';

@NgModule({
  declarations: [
    ManageMaintenanceComponent,
    NewMaintenanceComponent,
    MaintenanceHistoryComponent
  ],
  imports: [
    AppAntModule,
    CommonModule,
    ManageMaintenanceRouteModule,
    ScrollingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    ManageMaintenanceRouteModule
  ],
  providers: [
    {provide: ToastrService, useClass: ToastrService}
  ]
})
export class ManageMaintenanceModule {
}
