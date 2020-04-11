import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppAntModule} from '../../app.ant.module';
import {ManageUserComponent} from './manage-user.component';
import {ManageUserRoutingModule} from './manage-user-routing.module';
import {NzGridModule} from 'ng-zorro-antd';
import {CreateAccountComponent} from './create-account/create-account.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {DriverListComponent} from './driver-list/driver-list.component';
import {WorkshopListComponent} from './workshop-list/workshop-list.component';
import {DriverDetailComponent} from './driver-detail/driver-detail.component';
import {WorkshopDetailComponent} from './workshop-detail/workshop-detail.component';

@NgModule({
  declarations: [
    ManageUserComponent,
    CreateAccountComponent,
    DriverListComponent,
    WorkshopListComponent,
    DriverDetailComponent,
    WorkshopDetailComponent
  ],
  imports: [
    AppAntModule,
    CommonModule,
    ManageUserRoutingModule,
    NzGridModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    ManageUserRoutingModule
  ],
  providers: [
    {provide: ToastrService, useClass: ToastrService}
  ]
})
export class ManageUserModule {
}
