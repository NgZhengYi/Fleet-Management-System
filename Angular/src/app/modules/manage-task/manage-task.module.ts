import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppAntModule} from '../../app.ant.module';
import {ManageTaskComponent} from './manage-task.component';
import {ManageTaskRouteModule} from './manage-task.route.module';
import {NzSkeletonModule} from 'ng-zorro-antd';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { NewTaskComponent } from './new-task/new-task.component';
import {ReactiveFormsModule} from '@angular/forms';
import { UpdateTaskComponent } from './update-task/update-task.component';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { TaskHistoryComponent } from './task-history/task-history.component';

@NgModule({
  declarations: [ManageTaskComponent, NewTaskComponent, UpdateTaskComponent, TaskHistoryComponent],
  imports: [
    AppAntModule,
    CommonModule,
    ManageTaskRouteModule,
    NzSkeletonModule,
    ScrollingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    ManageTaskRouteModule
  ],
  providers: [
    {provide: ToastrService, useClass: ToastrService}
  ]
})
export class ManageTaskModule {
}
