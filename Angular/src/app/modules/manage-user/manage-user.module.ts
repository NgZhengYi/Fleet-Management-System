import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppAntModule} from '../../app.ant.module';
import {ManageUserComponent} from './manage-user.component';
import {ManageUserRoutingModule} from './manage-user-routing.module';
import {NzGridModule} from 'ng-zorro-antd';
import { CreateAccountComponent } from './create-account/create-account.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';

@NgModule({
  declarations: [
    ManageUserComponent,
    CreateAccountComponent
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
