import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ManageCostComponent} from './manage-cost.component';

const routes: Routes = [
  {
    path: '',
    component: ManageCostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCostRouteModule {
}
