import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManageTaskComponent} from './manage-task.component';
import {ManageTaskRouteModule} from './manage-task.route.module';

@NgModule({
  declarations: [ManageTaskComponent],
  imports: [
    CommonModule,
    ManageTaskRouteModule
  ],
  exports: [
    ManageTaskRouteModule
  ]
})
export class ManageTaskModule {
}
