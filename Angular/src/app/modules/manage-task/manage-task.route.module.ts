import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ManageTaskComponent} from './manage-task.component';
import {NewTaskComponent} from './new-task/new-task.component';
import {UpdateTaskComponent} from './update-task/update-task.component';
import {TaskHistoryComponent} from './task-history/task-history.component';

const routes: Routes = [
  {
    path: '',
    component: ManageTaskComponent
  },
  {
    path: 'new-task',
    component: NewTaskComponent
  },
  {
    path: 'update-task',
    component: UpdateTaskComponent
  },
  {
    path: 'task-history',
    component: TaskHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTaskRouteModule {
}
