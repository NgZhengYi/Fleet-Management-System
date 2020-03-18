import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ManageTaskComponent} from './manage-task.component';

const routes: Routes = [
  {
    path: '',
    component: ManageTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTaskRouteModule {
}
