import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManageUserComponent} from './manage-user.component';
import {ManageUserRoutingModule} from './manage-user-routing.module';
import {NzGridModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [
    ManageUserComponent
  ],
  imports: [
    CommonModule,
    ManageUserRoutingModule,
    NzGridModule
  ],
  exports: [
    ManageUserRoutingModule
  ]
})
export class ManageUserModule {
}
