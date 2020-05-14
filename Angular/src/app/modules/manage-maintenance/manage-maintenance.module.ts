import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {NzMessageService} from 'ng-zorro-antd/message';

import {AppAntModule} from '../../app.ant.module';
import {ManageMaintenanceRouteModule} from './manage-maintenance.route.module';
import {ManageMaintenanceComponent} from './manage-maintenance.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {NewMaintenanceComponent} from './new-maintenance/new-maintenance.component';
import {UpdateMaintenanceComponent} from './update-maintenance/update-maintenance.component';
import {HistoryMaintenanceComponent} from './history-maintenance/history-maintenance.component';

@NgModule({
  declarations: [
    ManageMaintenanceComponent,
    NewMaintenanceComponent,
    UpdateMaintenanceComponent,
    HistoryMaintenanceComponent
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
    {provide: ToastrService, useClass: ToastrService},
    NzMessageService
  ]
})
export class ManageMaintenanceModule {
}
